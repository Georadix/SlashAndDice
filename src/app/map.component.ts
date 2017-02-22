import { Component, OnInit } from '@angular/core';
import { GameStateService } from './game-state.service';
import { MapPane } from './MapPane';
import { FogOfWarService } from './fog-of-war.service';

@Component({
    selector: 'slash-map',
    template: '<div id="map"></div><fog-of-war></fog-of-war>',
    styles: [`
    :host, #map, #fow {
      height: 100%;
    }

    #fow {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 800;
        pointer-events: none;
    }

    .leaflet-container {
        background: #000;
        outline: 0;
    }
  `]
})
export class MapComponent implements OnInit{
    map: L.Map;
    backgroundPane = 'backgroundMaps';
    backgroundLayer: L.LayerGroup;
    tokenLayer: L.LayerGroup;

    /**
     * Initializes a new instance of {MapComponent}.
     */
    constructor(private gameStateService: GameStateService,
        private fogOfWarService: FogOfWarService) {

     }

    ngOnInit(): void {
        this.map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: 4,
            maxZoom: 8,
            zoomAnimation: false
        });

        let drawnItems = L.featureGroup();
        this.map.addLayer(drawnItems);
        let drawControl = new (<any>L).Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });

        this.map.on((<any>L).Draw.Event.CREATED, (e: any) => {
            e.layer.editing.enable();
            drawnItems.addLayer(e.layer);
            this.fogOfWarService.updateWalls(drawnItems);
        });

        this.map.on((<any>L).Draw.Event.EDITVERTEX, () => {
            this.fogOfWarService.updateWalls(drawnItems);
        });

        this.map.addControl(drawControl);

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

        L.control.layers(
            {'Map': this.backgroundLayer},
            {
                'Tokens': this.tokenLayer,
                'Dynamic Vision': drawnItems
            }). addTo(this.map);

        let mapState = this.gameStateService.getMap();

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

        mapState.map.addToLayer(this.backgroundLayer);
        this.map.fitBounds(mapState.map.getBounds());

        this.map.whenReady(() => {
            this.fogOfWarService.setMap(this.map);
            this.fogOfWarService.getRenderer().then((renderer) => {
                mapState.tokens.forEach((token) => {
                    token.onMove = (x, y) => {
                        this.fogOfWarService.moveLight(x, y);
                    };

                    token.addToLayer(this.tokenLayer);

                    this.fogOfWarService.moveLight(token.position.lng, token.position.lat);
                });
            });

        });

    }
}
