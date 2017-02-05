import { CreatureSize } from './CreatureSize';
import { MapPane } from './MapPane';

/**
 * Represents a token.
 */
export class Token {
    private tokenPoly: L.Polygon;
    private tokenOverlay: L.ImageOverlay;

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
     * The token size.
     */
    public size: CreatureSize;

    /**
     * Color of the token outline.
     */
    public outlineColor: string;

    /**
     * Initializes a new instance of {Token}.
     */
    constructor(imageUrl: string, position: L.LatLng, size: CreatureSize) {
        this.imageUrl = imageUrl;
        this.position = position;
        this.size = size;

        this.outlineColor = '#f00';
        this.showOutline = true;
    }

    public addToLayer(layer: L.LayerGroup): void {
        if (this.tokenPoly){
            this.tokenOverlay.remove();
        } else {
            this.tokenPoly = L.polygon(
                [this.position,
                L.latLng(this.position.lat + this.size, this.position.lng),
                L.latLng(this.position.lat + this.size, this.position.lng + this.size),
                L.latLng(this.position.lat, this.position.lng + this.size)], {
                draggable: true,
                fillOpacity: 0,
                pane: MapPane.token.toString()
            });

            this.tokenPoly.on('drag dragend', (e) => {
                this.tokenOverlay.setBounds(this.tokenPoly.getBounds());
            });
        }

        if (this.tokenOverlay) {
            this.tokenOverlay.remove();
        } else {
            this.tokenOverlay = L.imageOverlay(this.imageUrl, this.tokenPoly.getBounds(), {
                interactive: true,
                pane: MapPane.token.toString()
            });
        }

        layer.addLayer(this.tokenPoly);
        layer.addLayer(this.tokenOverlay);
    }
}
