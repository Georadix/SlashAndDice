import { Component, OnInit, ElementRef } from '@angular/core';
import { GameStateService } from './game-state.service';
import { FogOfWarService } from './fog-of-war.service';

@Component({
    selector: 'fog-of-war',
    template: '<div id="canvas"><canvas></canvas></div>',
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
        overflow:hidden;
    }

    #canvas {
        height:100%;
    }
  `]
})
export class FogOfWarComponent implements OnInit{
    /**
     * Initializes a new instance of {MapComponent}.
     */
    constructor(private element: ElementRef,
        private gameStateService: GameStateService,
        private fogOfWarService: FogOfWarService) {

     }

    ngOnInit(): void {
        /*this.fogOfWarService.getRenderer().then((renderer) => {
            $('#canvas', this.element.nativeElement).append(renderer.domElement);
        });*/
    }
}
