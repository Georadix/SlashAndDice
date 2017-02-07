import { Component, OnInit } from '@angular/core';
import { GameStateService } from './game-state.service';
import { MapPane } from './MapPane';

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
            maxZoom: 8
        });

        this.map.createPane(MapPane.background.toString());
        this.map.getPane(MapPane.background.toString()).style.zIndex = '399';
        this.map.createPane(MapPane.token.toString());
        this.map.getPane(MapPane.token.toString()).style.zIndex = '401';

        this.backgroundLayer = L.layerGroup([]);
        this.map.addLayer(this.backgroundLayer);
        this.backgroundLayer.setZIndex(0);

        this.tokenLayer = L.layerGroup([]);
        this.map.addLayer(this.tokenLayer);
        this.tokenLayer.setZIndex(10);

        L.control.layers({'Map': this.backgroundLayer}, {'Tokens': this.tokenLayer}). addTo(this.map);

        let mapState = this.gameStateService.getMap();

        this.addMapScale();
        mapState.map.addToLayer(this.backgroundLayer);
        this.map.fitBounds(mapState.map.getBounds());
        mapState.tokens.forEach((token) => {
            token.addToLayer(this.tokenLayer);
        });
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
}