/**
 * Represents a game map.
 */
export class Map {
    /**
     * Path to the map image.
     */
    public imageUrl: string;

    /**
     * Image width in meters.
     */
    public imageWidth: number;

    /**
     * Image height in meters.
     */
    public imageHeight: number;

        /**
     * Initializes a new instance of {Map}.
     */
    constructor(imageUrl: string, imageWidth: number, imageHeight: number) {
        this.imageUrl = imageUrl;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }
}
