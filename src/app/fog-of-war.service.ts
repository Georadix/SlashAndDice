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
    private outCanvas: HTMLCanvasElement;
    private wallMaterial: THREE.MeshPhongMaterial;
    private mapSize = 45.72;
    private light: THREE.SpotLight;

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

        this.outCanvas = <any>$('canvas', '#canvas')[0];

        let parent = $('#canvas');

        this.canvasWidth = parent.outerWidth();
        this.canvasHeight = parent.outerHeight();

        if (!this.renderer) {
            this.init();
        }

        this.map.addEventListener('movestart move moveend zoomend', () => {
            this.setViewPort();
        });


        this.setSize();
        this.setViewPort();
        window.addEventListener('resize', () => {
            this.setSize();
        });

    }

    public moveLight(x: number, y: number): void {
        this.light.position.set(x, y, 30);
        this.light.target.position.set(this.light.position.x, this.light.position.y, 0);
        this.render();
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
        this.render();
    }

    /**
     * Sets the size of the canvas element.
     */
    public setSize(): void {
        let parent = $('#canvas');

        this.canvasWidth = parent.outerWidth();
        this.canvasHeight = parent.outerHeight();

        this.outCanvas.width = this.canvasWidth;
        this.outCanvas.height = this.canvasHeight;
        this.renderer.setSize( this.canvasWidth, this.canvasHeight );
    }

    private init(): void {
        let size = 45.72;
        let center = 45.72 / 2;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(size / -2, size / 2, size / 2, size / -2, 0, 1000);
        this.camera.position.set(center, center, 1000);
        this.camera.lookAt(new THREE.Vector3(center, center, 0));

        this.wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading
        });

        // Add floor
        this.addFloor();

        // Add wall
        this.addWalls();



        // Add light
        this.addLight();

        this.scene.background = new THREE.Color(0xffffff);
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        });

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.setSize( 300, 300 );
        this.moveLight(0, 0);
        this.render();
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);

        this.addChromaKey();


    }

    private addFloor(): void {
        let geometry = new THREE.BoxGeometry(this.mapSize, this.mapSize, 1);
        let mesh = new THREE.Mesh( geometry, this.wallMaterial );
        mesh.position.set(this.mapSize / 2, this.mapSize / 2, 0);
        mesh.receiveShadow = true;
        this.scene.add( mesh );
    }

    private addLight(): void {
        this.light = new THREE.SpotLight( 0xffffff, 36 );
        this.light.decay = 7;
        this.light.distance = 100;
        this.light.penumbra = 0.5;
        this.light.angle = Math.PI / 4;
        this.light.castShadow = true;
        this.light.shadowBias = 0.001;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.scene.add( this.light );
        this.scene.add( this.light.target);
    }

    private addWalls(): void {
        let wallGeo = new THREE.BoxGeometry(4.572, 4.572, 1000, 0, 0, 0);
        let wallMesh = new THREE.Mesh(wallGeo, this.wallMaterial);
        wallMesh.castShadow = true;
        wallMesh.position.set( 6.858, 16.002, 0);
        this.scene.add(wallMesh);

        let wallMesh2 = new THREE.Mesh(wallGeo, this.wallMaterial);
        wallMesh2.castShadow = true;
        wallMesh2.position.set( 6.858, 23.622, 0);
        this.scene.add(wallMesh2);
    }

    private addChromaKey(): void {
        let ctx = this.outCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.drawImage(this.renderer.domElement, 0, 0, this.canvasWidth, this.canvasHeight);
        let imgData = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

        let l = imgData.data.length / 4;

        for (let i = 0; i < l; i++) {
            let r = imgData.data[i * 4 + 0];
            let g = imgData.data[i * 4 + 1];
            let b = imgData.data[i * 4 + 2];

            imgData.data[i * 4 + 3] = 255 - r;
        }


        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.putImageData(imgData, 0, 0);
    }
}
