import { Component } from '@angular/core';
import { GameStateService } from './game-state.service';
import { FogOfWarService } from './fog-of-war.service';

@Component({
  providers: [GameStateService, FogOfWarService],
  selector: 'app-root',
  template: '<slash-map></slash-map>',
  styles: [`
    :host {
      height: 100%;
    }

  `]
})
export class AppComponent {
}
