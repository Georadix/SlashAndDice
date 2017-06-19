

import { Component, OnInit } from '@angular/core';
import { Player } from './Player';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    private game: Phaser.Game;
    private player: Player;
    private mapSize: Phaser.Point;
    private mapScale = 10;
    constructor() { }

    ngOnInit() {
        this.game = new Phaser.Game('100', '100', Phaser.AUTO, 'game-canvas',
            { preload: this.preload, create: this.create, update: this.update });
    }

    private preload(): void {
        this.game.load.image('map', 'assets/keep.jpg');
        this.game.load.image('token', 'assets/token.png');
    }
    private create(): void {
        this.mapSize = new Phaser.Point(150, 150);

        // we need to add margin to the world, so the camera can move
        var margin = this.mapSize.x / 2;
        // and set the world's bounds according to the given margin
        var x = -margin;
        var y = -margin;
        var w = this.mapSize.x + margin * 2;
        var h = this.mapSize.y + margin * 2;
        // it's not necessary to increase height, we do it to keep uniformity
        this.game.world.setBounds(x, y, w, h);
        this.game.world.scale.setTo(10, 10);
        // we make sure camera is at position (0,0)
        this.game.world.camera.position.set(0, 0);

        // include some props on the scene
        var mapSprite = this.game.add.sprite(0, 0, 'map');
        mapSprite.inputEnabled = true;
        mapSprite.width = 150;
        mapSprite.height = 150;

        this.player = new Player(this.game, new Phaser.Point(mapSprite.width, mapSprite.height));

        var dragging = false;
        var dragStart;
        var cameraStartPoint = new Phaser.Point(0, 0);
        mapSprite.events.onInputDown.add((gameObject: any, pointer: Phaser.Pointer) => {
            dragging = true;
            cameraStartPoint.x = this.game.camera.position.x;
            cameraStartPoint.y = this.game.camera.position.y;

        });

        this.game.input.addMoveCallback((pointer: Phaser.Pointer) => {
            if (dragging) {
                if (!dragStart) {
                    dragStart = new Phaser.Point(pointer.position.x, pointer.position.y);
                }
                this.game.camera.x = cameraStartPoint.x + (dragStart.x - pointer.position.x);
                this.game.camera.y = cameraStartPoint.y + (dragStart.y - pointer.position.y);
            }
        }, this.game);

        this.game.input.onUp.add(() => {
            dragging = false;
            dragStart = undefined;
        });
    }
    private update(): void {
        this.player.update();
    }

}
