import { Component, OnInit, ElementRef } from '@angular/core';
import { GameStateService } from './game-state.service';

@Component({
    providers: [GameStateService],
    selector: 'fog-of-war',
    template: '',
    styles: [`
    :host {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 800;
        pointer-events: none;
    }
  `]
})
export class FogOfWarComponent implements OnInit{
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;

    /**
     * Initializes a new instance of {MapComponent}.
     */
    constructor(private element: ElementRef, private gameStateService: GameStateService) {

     }

    ngOnInit(): void {
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(0, 45.72, 0, 45.72);
        this.camera.position.z = 1000;

        var geometry = new THREE.BoxGeometry( 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(23, 23, 0);
        this.scene.add( mesh );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.element.nativeElement.appendChild( this.renderer.domElement );

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.render(this.scene, this.camera);
    }
}