import { Injectable } from '@angular/core';
import { Map } from '../shared/map';
import { Token } from '../shared/Token';

@Injectable()
export class RenderService {
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    private material: THREE.MeshPhongMaterial;
    private renderer: THREE.WebGLRenderer;
    private textureLoader: THREE.TextureLoader;
    private map: THREE.Mesh;
    private mapOffset: THREE.Vector2;
    private mapSize: THREE.Vector2;
    private mapImageSize: THREE.Vector2;
    private tokens: THREE.Mesh[] = [];
    private mouseDragPostion: THREE.Vector2;
    private zoom = 1;

    constructor() {

    }

    public init(container: HTMLElement): void {
        this.material = new THREE.MeshPhongMaterial();
        this.textureLoader = new THREE.TextureLoader();
        this.textureLoader.setCrossOrigin('');
        this.mapSize = new THREE.Vector2(150, 150);
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xffffff, 1));
        this.camera = new THREE.OrthographicCamera(
            this.mapSize.x / -2,
            this.mapSize.x / 2,
            this.mapSize.y / 2,
            this.mapSize.y / -2,
            0,
            1000);

        this.camera.position.set(this.mapSize.x / 2, this.mapSize.y / 2, 50);
        this.camera.lookAt(new THREE.Vector3(this.mapSize.x / 2, this.mapSize.y / 2, 0));

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        container.appendChild(this.renderer.domElement);
        this.renderer.domElement.draggable = true;
        this.renderer.domElement.addEventListener('dragstart', this.onDragStart);
        this.renderer.domElement.addEventListener('dragend', this.onDragEnd);

        window.addEventListener('resize', () => {
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.setViewPort();
        });

        window.addEventListener('dblclick', () => {
            this.setZoom(this.zoom + 0.25);
        });

        window.addEventListener('mousewheel', (event: MouseWheelEvent) => {
            if (event.ctrlKey) {
                event.preventDefault();
                let modifier = 0.1;
                if (event.wheelDelta < 0) {
                    modifier = -modifier;
                }

                this.setZoom(this.zoom + modifier);
            }
        });
    }

    private onDragStart = (event: DragEvent): void => {
        event.preventDefault();
        this.mouseDragPostion = new THREE.Vector2(event.clientX, event.clientY);
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.onDragEnd);
    }

    private onDrag = (event: MouseEvent): void => {
        let pos = new THREE.Vector2(event.clientX, event.clientY);
        let delta = pos.sub(this.mouseDragPostion);
        this.setViewPort(delta.x, delta.y);
        this.mouseDragPostion.set(event.clientX, event.clientY);
    }

    private onDragEnd = (event: DragEvent): void => {
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('mouseup', this.onDragEnd);
    }
    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Sets the current map.
     * @param map The map.
     */
    public setMap(map: Map): void {
        if (this.map) {
            this.tokens.forEach((token) => {
                this.scene.remove(token);
            });

            this.tokens = [];
            this.scene.remove(this.map);
        }

        this.textureLoader.load(map.imageUrl, (texture) => {
            this.mapOffset = new THREE.Vector2(0, 0);
            this.mapImageSize = new THREE.Vector2(
                texture.image.width,
                texture.image.height
            );

            let geometry = new THREE.CubeGeometry(map.size.x, map.size.y, 0.1);
            let material = new THREE.MeshLambertMaterial({ map: texture });
            this.map = new THREE.Mesh(geometry, material);
            this.map.position.set(map.size.x / 2, map.size.y / 2, 0);
            this.scene.add(this.map);

            this.camera.left = map.size.x / -2;
            this.camera.right = map.size.x / 2;
            this.camera.top = map.size.y / 2;
            this.camera.bottom = map.size.y / -2;
            this.camera.position.set(map.size.x / 2, map.size.y / 2, 50);
            this.camera.lookAt(new THREE.Vector3(this.mapSize.x / 2, this.mapSize.y / 2, 0));
            this.setViewPort();
        });

    }

    /**
     * Adds a token on the map.
     * @param token The player token.
     */
    public addToken(token: Token): void{
        this.textureLoader.load(token.imageUrl, texture => {
            let geometry = new THREE.CubeGeometry(token.size, token.size, 0.1);
            let material = new THREE.MeshLambertMaterial({
                map: texture,
                transparent: true
            });
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(token.postion.x, token.postion.y, 0);
            let outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.BackSide });
            let outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
            // outlineMesh.position = me.position;
            outlineMesh.scale.multiplyScalar(1.05);
            mesh.add(outlineMesh);

            this.addTokenLights(mesh);
            this.tokens.push(mesh);
            this.scene.add(mesh);

            this.render();
        });

    }

    /**
     * Sets the viewport size and offset.
     */
    public setViewPort(offsetX = 0, offsetY = 0): void {
        this.mapOffset.set(this.mapOffset.x + offsetX, this.mapOffset.y + offsetY);
        let size = new THREE.Vector2(
            this.mapImageSize.x * this.zoom,
            this.mapImageSize.y * this.zoom
        );

        let x = this.renderer.domElement.clientWidth / 2 + this.mapOffset.x;
        let y = this.renderer.domElement.clientHeight / 2 + this.mapOffset.y;
        let position = new THREE.Vector2(
            x - (this.mapImageSize.x / 2),
            y + (this.mapImageSize.y / 2)
        );

        let viewportOffsetX = position.x;
        let viewportOffsetY = position.y - this.renderer.getSize().height;

        this.renderer.setViewport(viewportOffsetX, -viewportOffsetY, size.x, Math.abs(size.y));
        this.render();
    }

    public setZoom(zoom: number): void{
        this.zoom = zoom;
        this.setViewPort();
    }

    private addTokenLights(token: THREE.Mesh): void{
        for (let i = 0; i < 1; i++) {
            let light = new THREE.SpotLight(0xffffff, 15);
            light.angle = Math.PI / 2;
            light.castShadow = true;
            light.decay = 1;
            light.distance = 30;
            light.penumbra = 1;
            light.shadow.bias = 0.0001;
            light.shadow.mapSize.set(2048, 2048);
            let p = token.position;
            light.position.set(0, 0, 5);
            light.target.position.set(100, 100, 5);
            this.scene.add(light);
            this.scene.add(light.target);
        }
    }
}
