import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'slash-map',
    template: '<div id="map"></div>',
    styles: [`
    :host, #map {
      height: 100%;
    }
    
  `]
})
export class MapComponent implements OnInit{
    map: L.Map;

    ngOnInit(): void {
        this.map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -5
        });

        let bounds = L.latLngBounds([[0, 0], [2160, 2160]]);
        let image = L.imageOverlay('http://imgur.com/KHt68Bj.png', bounds);
        image.addTo(this.map);
        this.map.fitBounds(bounds);

        let options = {interval: 72,
               showOriginLabel: false,
               redraw: 'move',
               zoomIntervals: [
                {start: 0, end: 3, interval: 50},
                {start: 4, end: 5, interval: 5},
                {start: 6, end: 20, interval: 1}
            ]};

        L.simpleGraticule(options).addTo(this.map);
    }
}