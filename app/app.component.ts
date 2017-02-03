import { Component } from '@angular/core';



@Component({
  selector: 'slash-app',
  templateUrl: 'app/app.component.html',
  styles: [`
    :host {
      height: 100%;
    }
    
  `]
})
export class AppComponent  {
  name = 'Angular2';
}
