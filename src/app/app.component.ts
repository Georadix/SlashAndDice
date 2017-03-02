import { Component } from '@angular/core';

@Component({
    providers: [],
    selector: 'app-root',
    template: '<app-map></app-map>',
    styles: [`
        :host {
            height: 100%;
        }
    `]
})
export class AppComponent {
}
