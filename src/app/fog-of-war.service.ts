import { Injectable } from '@angular/core';

/**
 * Fog of War service.
 */
@Injectable()
export class FogOfWarService {
    private map: L.Map;
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;
    private zoomLevel: number;
    private canvasWidth: number;
    private canvasHeight: number;

    /**
     * Gets the Threejs renderer.
     */
    public getRenderer(): Promise<THREE.WebGLRenderer> {
        return new Promise<THREE.WebGLRenderer>((resolve) => {
            if (!this.renderer) {
                this.init();
            }

            resolve(this.renderer);
        });
    }

    /**
     * Sets the leaflet map.
     */
    public setMap(map: L.Map): void {
        this.map = map;
        this.zoomLevel = this.map.getZoom();

        if (!this.renderer) {
            this.init();
        }

        this.map.addEventListener('movestart move moveend zoomend', () => {
            this.setViewPort();
        });


        this.setSize();
        window.addEventListener('resize', () => {
            this.setSize();
        });

    }

    /**
     * Sets the viewport size and offset.
     */
    public setViewPort(): void {
        let size = this.map.project(L.latLng(45.72, 45.72), this.map.getZoom());

        let point3 = this.map.latLngToContainerPoint(L.latLng(0, 0));

        let viewportOffsetX = point3.x;
        let viewportOffsetY = point3.y - this.canvasHeight;

        this.renderer.setViewport(viewportOffsetX, -viewportOffsetY, size.x, Math.abs(size.y));
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Sets the size of the canvas element.
     */
    public setSize(): void {
        let parent = $('#canvas');
        this.canvasWidth = parent.outerWidth();
        this.canvasHeight = parent.outerHeight();
        this.renderer.setSize( this.canvasWidth, this.canvasHeight );
    }

    private init(): void {
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(0, 45.72, 0, 45.72);
        this.camera.position.z = 1000;

        let geometry = new THREE.BoxGeometry( 3.048, 3.048, 3.048 );
        let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(3.048, 3.048, 0);
        this.scene.add( mesh );

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        });

        this.renderer.setSize( 300, 300 );
        this.renderer.render(this.scene, this.camera);
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}
