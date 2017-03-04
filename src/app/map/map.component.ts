import { Component, OnInit, ElementRef } from '@angular/core';
import { RenderService } from '../services/render.service';
import { Map } from '../shared/map';
import { Token } from '../shared/token';

@Component({
    selector: 'app-map',
    template: '<div id="renderer"></div>',
    styles: [`
        :host {
            height: 100%;
            overflow:hidden;
        }
        #renderer {
            height:100%;
            overflow:hidden;
        }
    `]
})
export class MapComponent implements OnInit {

    constructor(private renderService: RenderService,
        private element: ElementRef) {

    }

    ngOnInit() {
        this.renderService.init(this.element.nativeElement.firstElementChild);
        let map = new Map('assets/greenest-keep.jpg', 150, 150);
        this.renderService.setMap(map);

        let token = new Token('assets/token.png', 5, 75, 75);
        this.renderService.addToken(token);
        // this.renderService.setViewPort();
    }

}
