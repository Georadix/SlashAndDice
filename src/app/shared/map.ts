/**
 * Represents metadata for a map.
 */
export class Map {
    /**
     * The image URL.
     */
    public imageUrl: string;

    /**
     * The size in feet.
     */
    public size: THREE.Vector2;

    /**
     * Initializes a new instance of {Map} class.
     * @param imageUrl The image URL.
     * @param width The map width in feet.
     * @param height The map height in feet.
     */
    constructor(imageUrl: string, width: number, height: number) {
        this.imageUrl = imageUrl;
        this.size = new THREE.Vector2(width, height);
    }
}