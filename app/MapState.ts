import {Map} from './Map';
import {Token} from './Token';

/**
 * Represents the state of a game map.
 */
export class MapState{
    /**
     * The map.
     */
    public map: Map;

    /**
     * List of tokens on the map.
     */
    public tokens: Token[];

    /**
     * Initializes a new instance of {MapState}.
     */
    constructor() {
        this.tokens = [];
    }
}
