import { MapPane } from './MapPane';

/**
 * Represents a game map.
 */
export class Map {
    private imageOverlay: L.ImageOverlay;
    
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

    public addToLayer(layer: L.LayerGroup): void {
        if (this.imageOverlay) {
            this.imageOverlay.remove();
        } else {
            let bounds = L.latLngBounds([[0, 0], [this.imageWidth, this.imageHeight]]);
            this.imageOverlay = L.imageOverlay(this.imageUrl, bounds, {
                pane: MapPane.background.toString()
            });
        }
        layer.addLayer(this.imageOverlay);
    }

    public getBounds(): L.LatLngBounds {
        return this.imageOverlay.getBounds();
    }
}