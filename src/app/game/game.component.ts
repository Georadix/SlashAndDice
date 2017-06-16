

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    private game: Phaser.Game;
    private inputs: Phaser.CursorKeys;

  constructor() { }

  ngOnInit() {
    this.game = new Phaser.Game('100', '100', Phaser.AUTO, 'game-canvas',
      { preload: this.preload, create: this.create, update: this.update });
  }

  private preload(): void {
      this.game.load.image('map', 'assets/keep.jpg');
  }
  private create(): void {
      var mapImage = this.game.cache.getImage('map');

      // we need to add margin to the world, so the camera can move
      var margin = 500;
      // and set the world's bounds according to the given margin
      var x = -margin;
      var y = -margin;
      var w = mapImage.width + margin * 2;
      var h = mapImage.height + margin * 2;
      // it's not necessary to increase height, we do it to keep uniformity
      this.game.world.setBounds(x, y, w, h);

      // we make sure camera is at position (0,0)
      this.game.world.camera.position.set(0, 0);

      // include some props on the scene
      this.game.add.sprite(0, 0, 'map');

      this.inputs = this.game.input.keyboard.createCursorKeys();
      this.inputs.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.inputs.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.inputs.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.inputs.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

   }
  private update(): void {

      if (this.inputs.up.isDown) {
          this.game.camera.y -= 4;
      }else if (this.inputs.down.isDown) {
          this.game.camera.y += 4;
      }

      if (this.inputs.left.isDown) {
          this.game.camera.x -= 4;
      }else if (this.inputs.right.isDown) {
          this.game.camera.x += 4;
      }
   }

}
