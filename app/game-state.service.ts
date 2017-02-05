import { Injectable } from '@angular/core';
import { MapState } from './MapState';
import { Map } from './Map';
import { Token } from './Token';
/**
 * Service for loading and saving game states.
 */
@Injectable()
export class GameStateService {
    /**
     * Gets a map state.
     */
    public getMap(): MapState{
        let map = new Map('http://imgur.com/KHt68Bj.png', 45.72, 45.72);
        let token = new Token('http://i.imgur.com/2okhBTl.png', L.latLng(22.86, 22.86), 1.524);
        let token2 = new Token('http://i.imgur.com/2okhBTl.png', L.latLng(15, 22.86), 3.048);
        let token3 = new Token('http://i.imgur.com/2okhBTl.png', L.latLng(10, 22.86), 4.572);

        let mapState = new MapState();
        mapState.map = map;
        mapState.tokens.push(token);
        mapState.tokens.push(token2);
        mapState.tokens.push(token3);

        return mapState;
    }
}
