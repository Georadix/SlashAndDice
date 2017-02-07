import { Injectable } from '@angular/core';
import { MapState } from './MapState';
import { Map } from './Map';
import { Token } from './Token';
import { CreatureSize } from './CreatureSize';

/**
 * Service for loading and saving game states.
 */
@Injectable()
export class GameStateService {
    /**
     * Gets a map state.
     */
    public getMap(): MapState{
        let tUrl = 'http://i.imgur.com/2okhBTl.png';
        let map = new Map('http://imgur.com/KHt68Bj.png', 45.72, 45.72);
        let token = new Token(tUrl, L.latLng(22.86, 22.86), CreatureSize.Medium);

        let mapState = new MapState();
        mapState.map = map;
        mapState.tokens.push(token);

        return mapState;
    }
}