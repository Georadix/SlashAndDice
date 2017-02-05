import { Component, OnInit } from '@angular/core';
import { GameStateService } from './game-state.service';
import { Map } from './Map';
import { Token } from './Token';

@Component({
    providers: [GameStateService],
    selector: 'slash-map',
    template: '<div id="map"></div>',
    styles: [`
    :host, #map {
      height: 100%;
    }

    .leaflet-container {
        background: #000;
        outline: 0;
    }
  `]
})
export class MapComponent implements OnInit{
    map: L.Map;
    backgroundPane: string = 'backgroundMaps';
    backgroundLayer: L.LayerGroup;
    tokenPane: string = 'tokens';
    tokenLayer: L.LayerGroup;

    /**
     * Initializes a new instance of {MapComponent}.
     */
    constructor(private gameStateService: GameStateService) {

     }

    ngOnInit(): void {
        this.map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: 4,
            maxZoom: 6
        });

        this.map.createPane(this.backgroundPane);
        this.map.getPane(this.backgroundPane).style.zIndex = '399';
        this.map.createPane(this.tokenPane);
        this.map.getPane(this.tokenPane).style.zIndex = '401';

        this.backgroundLayer = L.layerGroup([]);
        this.map.addLayer(this.backgroundLayer);
        this.backgroundLayer.setZIndex(0);

        this.tokenLayer = L.layerGroup([]);
        this.map.addLayer(this.tokenLayer);
        this.tokenLayer.setZIndex(10);

        L.control.layers({'Map': this.backgroundLayer}, {'Tokens': this.tokenLayer}). addTo(this.map);

        let mapState = this.gameStateService.getMap();

        this.addBackgroundMap(mapState.map);
        this.addMapScale();
        mapState.tokens.forEach((token) => {
            this.addToken(token);
        });
    }

    private addToken(token: Token): void {
        let tokenPoly = L.polygon(
            [token.position,
            L.latLng(token.position.lat + token.size, token.position.lng),
            L.latLng(token.position.lat + token.size, token.position.lng + token.size),
            L.latLng(token.position.lat, token.position.lng + token.size)], {
            draggable: true,
            fillOpacity: 0,
            pane: this.tokenPane
        });

        let tokenOverlay = L.imageOverlay(token.imageUrl, tokenPoly.getBounds(), {
            interactive: true,
            pane: this.tokenPane
        });

        tokenOverlay.bringToFront();

        tokenPoly.on('drag dragend', (e) => {
            tokenOverlay.setBounds(tokenPoly.getBounds());
            console.log(tokenPoly.getBounds().toBBoxString());
        });

        this.tokenLayer.addLayer(tokenPoly);
        this.tokenLayer.addLayer(tokenOverlay);
        tokenOverlay.bringToFront();
    }

    private addMapScale(): void {
        let options = {
            interval: 1.524,
            showOriginLabel: false,
            redraw: '',
            pane: this.backgroundPane
        };

        this.backgroundLayer.addLayer(L.simpleGraticule(options));
        L.control.scale({
            imperial: true,
            metric: false,

        }).addTo(this.map);

        L.control.mousePosition().addTo(this.map);
    }

    private addBackgroundMap(map: Map): void{
        let bounds = L.latLngBounds([[0, 0], [map.imageWidth, map.imageHeight]]);
        let image = L.imageOverlay(map.imageUrl, bounds, {
            pane: this.backgroundPane
        });

        this.backgroundLayer.addLayer(image);
        image.bringToBack();

        this.map.fitBounds(bounds);
    }
}