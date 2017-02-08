webpackJsonp([1,4],{

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPane; });
var MapPane;
(function (MapPane) {
    MapPane[MapPane["background"] = 0] = "background";
    MapPane[MapPane["token"] = 1] = "token";
    MapPane[MapPane["dm"] = 2] = "dm";
})(MapPane || (MapPane = {}));
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/MapPane.js.map

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 343;


/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(457);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/main.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatureSize; });
var CreatureSize;
(function (CreatureSize) {
    CreatureSize[CreatureSize["Small"] = 1.524] = "Small";
    CreatureSize[CreatureSize["Medium"] = 1.524] = "Medium";
    CreatureSize[CreatureSize["Large"] = 3.048] = "Large";
    CreatureSize[CreatureSize["Huge"] = 4.572] = "Huge";
    CreatureSize[CreatureSize["Gargantuan"] = 6.096] = "Gargantuan";
    CreatureSize[CreatureSize["Colossal"] = 9.144] = "Colossal";
})(CreatureSize || (CreatureSize = {}));
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/CreatureSize.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MapPane__ = __webpack_require__(199);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });

/**
 * Represents a game map.
 */
var Map = (function () {
    /**
 * Initializes a new instance of {Map}.
 */
    function Map(imageUrl, imageWidth, imageHeight) {
        this.imageUrl = imageUrl;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }
    Map.prototype.addToLayer = function (layer) {
        if (this.imageOverlay) {
            this.imageOverlay.remove();
        }
        else {
            var bounds = L.latLngBounds([[0, 0], [this.imageWidth, this.imageHeight]]);
            this.imageOverlay = L.imageOverlay(this.imageUrl, bounds, {
                pane: __WEBPACK_IMPORTED_MODULE_0__MapPane__["a" /* MapPane */].background.toString()
            });
        }
        layer.addLayer(this.imageOverlay);
    };
    Map.prototype.getBounds = function () {
        return this.imageOverlay.getBounds();
    };
    return Map;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/Map.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapState; });
/**
 * Represents the state of a game map.
 */
var MapState = (function () {
    /**
     * Initializes a new instance of {MapState}.
     */
    function MapState() {
        this.tokens = [];
    }
    return MapState;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/MapState.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MapPane__ = __webpack_require__(199);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Token; });

/**
 * Represents a token.
 */
var Token = (function () {
    /**
     * Initializes a new instance of {Token}.
     */
    function Token(imageUrl, position, size) {
        this.imageUrl = imageUrl;
        this.position = this.snapToGrid(position);
        this.size = size;
        this.outlineColor = '#f00';
        this.showOutline = true;
    }
    Token.prototype.addToLayer = function (layer) {
        var _this = this;
        if (this.tokenPoly) {
            this.tokenOverlay.remove();
        }
        else {
            this.tokenPoly = L.polygon([this.position,
                L.latLng(this.position.lat + this.size, this.position.lng),
                L.latLng(this.position.lat + this.size, this.position.lng + this.size),
                L.latLng(this.position.lat, this.position.lng + this.size)], {
                draggable: true,
                fillOpacity: 0,
                pane: __WEBPACK_IMPORTED_MODULE_0__MapPane__["a" /* MapPane */].token.toString()
            });
            this.tokenPoly.on('drag', function (e) {
                _this.tokenOverlay.setBounds(_this.tokenPoly.getBounds());
            });
            this.tokenPoly.on('dragend', function (e) {
                var sw = _this.snapToGrid(_this.tokenPoly.getBounds().getSouthWest());
                _this.tokenPoly.setLatLngs([sw,
                    L.latLng(sw.lat + _this.size, sw.lng),
                    L.latLng(sw.lat + _this.size, sw.lng + _this.size),
                    L.latLng(sw.lat, sw.lng + _this.size)]);
                _this.tokenOverlay.setBounds(_this.tokenPoly.getBounds());
            });
        }
        if (this.tokenOverlay) {
            this.tokenOverlay.remove();
        }
        else {
            this.tokenOverlay = L.imageOverlay(this.imageUrl, this.tokenPoly.getBounds(), {
                interactive: true,
                pane: __WEBPACK_IMPORTED_MODULE_0__MapPane__["a" /* MapPane */].token.toString()
            });
        }
        layer.addLayer(this.tokenPoly);
        layer.addLayer(this.tokenOverlay);
    };
    Token.prototype.snapToGrid = function (latLng) {
        var lat = Math.round(latLng.lat / 1.524) * 1.524;
        var lng = Math.round(latLng.lng / 1.524) * 1.524;
        return L.latLng(lat, lng);
    };
    return Token;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/Token.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: '<slash-map></slash-map>',
            styles: ["\n    :host {\n      height: 100%;\n    }\n    \n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/app.component.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_component__ = __webpack_require__(459);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__map_component__["a" /* MapComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/app.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MapState__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Map__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Token__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CreatureSize__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameStateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Service for loading and saving game states.
 */
var GameStateService = (function () {
    function GameStateService() {
    }
    /**
     * Gets a map state.
     */
    GameStateService.prototype.getMap = function () {
        var tUrl = 'http://i.imgur.com/2okhBTl.png';
        var map = new __WEBPACK_IMPORTED_MODULE_2__Map__["a" /* Map */]('http://imgur.com/KHt68Bj.png', 45.72, 45.72);
        var token = new __WEBPACK_IMPORTED_MODULE_3__Token__["a" /* Token */](tUrl, L.latLng(22.86, 22.86), __WEBPACK_IMPORTED_MODULE_4__CreatureSize__["a" /* CreatureSize */].Medium);
        var mapState = new __WEBPACK_IMPORTED_MODULE_1__MapState__["a" /* MapState */]();
        mapState.map = map;
        mapState.tokens.push(token);
        return mapState;
    };
    GameStateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], GameStateService);
    return GameStateService;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/game-state.service.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_state_service__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MapPane__ = __webpack_require__(199);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapComponent = (function () {
    /**
     * Initializes a new instance of {MapComponent}.
     */
    function MapComponent(gameStateService) {
        this.gameStateService = gameStateService;
        this.backgroundPane = 'backgroundMaps';
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: 4,
            maxZoom: 8
        });
        this.map.createPane(__WEBPACK_IMPORTED_MODULE_2__MapPane__["a" /* MapPane */].background.toString());
        this.map.getPane(__WEBPACK_IMPORTED_MODULE_2__MapPane__["a" /* MapPane */].background.toString()).style.zIndex = '399';
        this.map.createPane(__WEBPACK_IMPORTED_MODULE_2__MapPane__["a" /* MapPane */].token.toString());
        this.map.getPane(__WEBPACK_IMPORTED_MODULE_2__MapPane__["a" /* MapPane */].token.toString()).style.zIndex = '401';
        this.backgroundLayer = L.layerGroup([]);
        this.map.addLayer(this.backgroundLayer);
        this.backgroundLayer.setZIndex(0);
        this.tokenLayer = L.layerGroup([]);
        this.map.addLayer(this.tokenLayer);
        this.tokenLayer.setZIndex(10);
        L.control.layers({ 'Map': this.backgroundLayer }, { 'Tokens': this.tokenLayer }).addTo(this.map);
        var mapState = this.gameStateService.getMap();
        this.addMapScale();
        mapState.map.addToLayer(this.backgroundLayer);
        this.map.fitBounds(mapState.map.getBounds());
        mapState.tokens.forEach(function (token) {
            token.addToLayer(_this.tokenLayer);
        });
    };
    MapComponent.prototype.addMapScale = function () {
        var options = {
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
    };
    MapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__game_state_service__["a" /* GameStateService */]],
            selector: 'slash-map',
            template: '<div id="map"></div>',
            styles: ["\n    :host, #map {\n      height: 100%;\n    }\n    .leaflet-container {\n        background: #000;\n        outline: 0;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_state_service__["a" /* GameStateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__game_state_service__["a" /* GameStateService */]) === 'function' && _a) || Object])
    ], MapComponent);
    return MapComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/map.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Dominic/Documents/GitHub/SlashAndDice/src/environment.js.map

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(344);


/***/ })

},[626]);
//# sourceMappingURL=main.bundle.map