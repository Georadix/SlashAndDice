export class Token {
    public imageUrl: string;
    public size: number;
    public postion: THREE.Vector2;

    constructor(imageUrl: string, size: number, x: number, y: number) {
        this.imageUrl = imageUrl;
        this.size = size;
        this.postion = new THREE.Vector2(x, y);
    }
}