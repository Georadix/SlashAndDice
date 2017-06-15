import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private game: Phaser;

  constructor() { }

  ngOnInit() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas',
      { preload: this.preload, create: this.create, update: this.update });
  }

  private preload(): void { }
  private create(): void { }
  
  private update(): void { }

}
