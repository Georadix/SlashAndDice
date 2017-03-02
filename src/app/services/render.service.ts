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
    private mapSize: THREE.Vector2;
    private tokens: THREE.Mesh[] = [];

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

        this.textureLoader.load(map.imageUrl, texture => {
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
            this.render();
        });

    }

    /**
     * Adds a token on the map.
     * @param token The player token.
     */
    public addToken(token: Token): void{
        this.textureLoader.load(token.imageUrl, texture => {
            let geometry = new THREE.CubeGeometry(token.size, token.size, 0.1);
            let material = new THREE.MeshLambertMaterial({ map: texture });
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(token.postion.x, token.postion.y, 0.1);

            this.tokens.push(mesh);
            this.scene.add(mesh);

            this.render();
        });

    }

    private addTokenLights(token: THREE.Mesh): void{
        for (let i = 0; i < 5; i++) {
            let light = new THREE.SpotLight(0xffffff, 15);
            light.angle = Math.PI / 3;
            light.castShadow = true;
            light.decay = 1;
            light.distance = 30;
            light.penumbra = 1;
            light.shadow.bias = 0.0001;
            light.shadow.mapSize.set(2048, 2048);

            token.add(light);
            token.add(light.target);
        }
    }
}
