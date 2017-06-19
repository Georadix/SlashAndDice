/**
 * The player character.
 */
export class Player {
    private sprite: Phaser.Sprite;
    private inputs: Phaser.CursorKeys;
    private isMoving = false;
    private movementSpeed = 100;
    private movementTimer: Phaser.Timer;


    /**
     * Initializes a new instance of {Player} class.
     * @param game The Phaser game instance.
     * @param position The position to spawn the player.
     */
    constructor(private game: Phaser.Game, position: Phaser.Point) {
        this.sprite = this.game.add.sprite(position.x / 2, position.y / 2, 'token');
        this.sprite.width = 5;
        this.sprite.height = 5;
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(true);
        this.inputs = this.game.input.keyboard.createCursorKeys();
    }

    /**
     * Update callback.
     */
    public update(): void {
        if (!this.isMoving && (
            this.inputs.up.isDown ||
            this.inputs.down.isDown ||
            this.inputs.left.isDown ||
            this.inputs.right.isDown
        )) {
            if (this.inputs.up.isDown) {
                this.sprite.y -= 5;
            } else if (this.inputs.down.isDown) {
                this.sprite.y += 5;
            }

            if (this.inputs.left.isDown) {
                this.sprite.x -= 5;
            } else if (this.inputs.right.isDown) {
                this.sprite.x += 5;
            }

            this.sprite.x = Math.round(this.sprite.x / 5) * 5;
            this.sprite.y = Math.round(this.sprite.y / 5) * 5;

            this.isMoving = true;

            this.movementTimer = this.game.time.create();
            this.movementTimer.add(this.movementSpeed, () => {
                this.isMoving = false;
            });
            this.movementTimer.start();
        }
    }
}
