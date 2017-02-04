import { Component, OnInit } from '@angular/core';

@Component({
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

        this.addBackgroundMap();
        this.addMapScale();
        this.addToken();
    }

    private addToken(): void {
        let tokenPoly = L.polygon([L.latLng(0, 0), L.latLng(1.524, 0), L.latLng(1.524, 1.524), L.latLng(0, 1.524)], {
            draggable: true,
            fillOpacity: 0,
            pane: this.tokenPane
        });

        let tokenUrl = 'http://i.imgur.com/2okhBTl.png';
        let tokenOverlay = L.imageOverlay(tokenUrl, tokenPoly.getBounds(), {
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

    private addBackgroundMap(): void{
        // TODO: Load dynamic image and calculate size and scale.
        let bounds = L.latLngBounds([[0, 0], [45.72, 45.72]]);
        let image = L.imageOverlay('http://imgur.com/KHt68Bj.png', bounds, {
            pane: this.backgroundPane
        });
        
        this.backgroundLayer.addLayer(image);
        image.bringToBack();

        this.map.fitBounds(bounds);
    }
}