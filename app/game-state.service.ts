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
        let token2 = new Token(tUrl, L.latLng(15, 22.86), CreatureSize.Large);
        let token3 = new Token(tUrl, L.latLng(10, 22.86), CreatureSize.Huge);
        let token4 = new Token(tUrl, L.latLng(22.86, 15), CreatureSize.Gargantuan);
        let token5 = new Token(tUrl, L.latLng(10, 15), CreatureSize.Colossal);

        let mapState = new MapState();
        mapState.map = map;
        mapState.tokens.push(token);
        mapState.tokens.push(token2);
        mapState.tokens.push(token3);
        mapState.tokens.push(token4);
        mapState.tokens.push(token5);

        return mapState;
    }
}
