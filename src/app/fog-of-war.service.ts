import { Injectable } from '@angular/core';
import { CreatureSize } from './CreatureSize';

/**
 * Fog of War service.
 */
@Injectable()
export class FogOfWarService {
    private map: L.Map;
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    // private camera: THREE.PerspectiveCamera;

    private renderer: THREE.WebGLRenderer;
    private zoomLevel: number;
    private canvasWidth: number;
    private canvasHeight: number;
    private outCanvas: HTMLCanvasElement;
    private wallMaterial: THREE.MeshPhongMaterial;
    private mapSize = 45.72;
    private lights: THREE.SpotLight[] = [];
    private raycaster: THREE.Raycaster;
    private walls: THREE.Mesh[] = [];

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

    public updateWalls(features: L.FeatureGroup): void {
        this.walls.forEach((wall) => {
            this.scene.remove(wall);
        });
        this.walls = [];
        features.eachLayer((layer) => {
            this.addWalls((<any>layer).getLatLngs());
        });
        this.walls.forEach((wall) => {
            this.scene.add(wall);
        });

        this.render();
    }

    public moveLight(x: number, y: number): void {
        this.raycaster.set(new THREE.Vector3(x, y, 1000), new THREE.Vector3(0, 0, -1));
        let intersects = this.raycaster.intersectObjects(this.scene.children, true);

        let z = 1000 - intersects[0].distance + CreatureSize.Medium;
        let index = 0;
        this.lights.forEach((light) => {
            light.position.set(x, y, z);

            switch ( index ) {
                case 0:
                    light.target.position.set(x + 100, y, z);
                    break;
                case 1:
                    light.target.position.set(x, y - 100, z);
                    break;
                case 2:
                    light.target.position.set(x - 100, y, z);
                    break;
                case 3:
                    light.target.position.set(x, y + 100, z);
                    break;
                case 4:
                    light.target.position.set(x, y, 0);
            }

            index++;
        });

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
        // this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 10000);
        this.camera.position.set(center, center, 50);
        this.camera.lookAt(new THREE.Vector3(center, center, 0));

        this.wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        });

        this.raycaster = new THREE.Raycaster();

        // Add floor
        this.addFloor();

        // Add wall
        // this.addWalls();

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
        mesh.castShadow = true;
        this.scene.add( mesh );
    }

    private addLight(): void {

        for (let i = 0; i < 5; i++){
            let light = new THREE.SpotLight( 0xffffff, 36 );
            light.angle = Math.PI / 3;
            light.castShadow = true;
            light.decay = 7;
            light.distance = 100;
            light.penumbra = 0.5;
            this.lights.push(light);
            this.scene.add( light );
            this.scene.add( light.target);
        }

    }

    private addWalls(coordinates: L.LatLng[]): void {
        for (let i = 0; i < coordinates.length - 1; i++) {
            this.addWall(coordinates[i], coordinates[i + 1]);
        }
    }
    private addWall(start: L.LatLng, end: L.LatLng): void {
        let length = this.map.distance(start, end);
        let rad = Math.atan((start.lat - end.lat) / (start.lng - end.lng));
        let geometry = new THREE.BoxGeometry(length, 0.1, 100);
        let mesh = new THREE.Mesh( geometry, this.wallMaterial );

        let centerX = (start.lng + end.lng) / 2;
        let centerY = (start.lat + end.lat) / 2;
        mesh.position.set(
            centerX,
            centerY,
            50
        );
        mesh.rotateZ(rad);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.walls.push(mesh);
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
