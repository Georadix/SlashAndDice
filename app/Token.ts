/**
 * Represents a token.
 */
export class Token {
    /**
     * Image URL of the token.
     */
    public imageUrl: string;

    /**
     * Position of the token on the map.
     */
    public position: L.LatLng;

    /**
     * Flag indicating wether to show the outline.
     */
    public showOutline: boolean;

    /**
     * The token size in meters.
     */
    public size: number;

    /**
     * Color of the token outline.
     */
    public outlineColor: string;

    /**
     * Initializes a new instance of {Token}.
     */
    constructor(imageUrl: string, position: L.LatLng, size: number) {
        this.imageUrl = imageUrl;
        this.position = position;
        this.size = size;

        this.outlineColor = '#f00';
        this.showOutline = true;
    }
}
