webpackJsonp([1,4],{149:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i;!function(t){t[t.background=0]="background",t[t.token=1]="token",t[t.dm=2]="dm"}(i||(i={}))},219:function(t,e,n){"use strict";var i=n(1),r=n(68),o=n(67);n.d(e,"a",function(){return a});var a=function(){function t(t,e,n){this.element=t,this.gameStateService=e,this.fogOfWarService=n}return t.prototype.ngOnInit=function(){},t.ctorParameters=function(){return[{type:i.H},{type:r.a},{type:o.a}]},t}()},220:function(t,e,n){"use strict";var i=n(68),r=n(149),o=n(67);n.d(e,"a",function(){return a});var a=function(){function t(t,e){this.gameStateService=t,this.fogOfWarService=e,this.backgroundPane="backgroundMaps"}return t.prototype.ngOnInit=function(){var t=this;this.map=L.map("map",{crs:L.CRS.Simple,minZoom:4,maxZoom:8,zoomAnimation:!1}),this.map.whenReady(function(){t.fogOfWarService.setMap(t.map)}),this.map.createPane(r.a.background.toString()),this.map.getPane(r.a.background.toString()).style.zIndex="399",this.map.createPane(r.a.token.toString()),this.map.getPane(r.a.token.toString()).style.zIndex="401",this.backgroundLayer=L.layerGroup([]),this.map.addLayer(this.backgroundLayer),this.backgroundLayer.setZIndex(0),this.tokenLayer=L.layerGroup([]),this.map.addLayer(this.tokenLayer),this.tokenLayer.setZIndex(10),L.control.layers({Map:this.backgroundLayer},{Tokens:this.tokenLayer}).addTo(this.map);var e=this.gameStateService.getMap(),n={interval:1.524,showOriginLabel:!1,redraw:"",pane:this.backgroundPane};this.backgroundLayer.addLayer(L.simpleGraticule(n)),L.control.scale({imperial:!0,metric:!1}).addTo(this.map),e.map.addToLayer(this.backgroundLayer),this.map.fitBounds(e.map.getBounds()),e.tokens.forEach(function(e){e.addToLayer(t.tokenLayer)})},t.ctorParameters=function(){return[{type:i.a},{type:o.a}]},t}()},263:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=263},264:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(342),o=n(333),a=n(214);r.a.production&&n.i(i.a)(),n.i(a.a)().bootstrapModuleFactory(o.a)},332:function(t,e,n){"use strict";var i=n(340),r=n(84),o=n(31),a=n(62),s=n(68),_=n(67),h=n(37),c=n(36),u=n(47),l=n(220),p=n(335);n.d(e,"a",function(){return m});var d=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},f=function(){function t(){this._changed=!1,this.context=new i.a}return t.prototype.ngOnDetach=function(t,e,n){},t.prototype.ngOnDestroy=function(){},t.prototype.ngDoCheck=function(t,e,n){var i=this._changed;return this._changed=!1,i},t.prototype.checkHost=function(t,e,n,i){},t.prototype.handleEvent=function(t,e){var n=!0;return n},t.prototype.subscribe=function(t,e){this._eventHandler=e},t}(),g=o.createRenderComponentType("",0,a.b.None,[],{}),y=function(t){function e(n,i,r,o){t.call(this,e,g,h.a.HOST,n,i,r,o,c.b.CheckAlways)}return d(e,t),Object.defineProperty(e.prototype,"_GameStateService_0_4",{get:function(){return null==this.__GameStateService_0_4&&(this.__GameStateService_0_4=new s.a),this.__GameStateService_0_4},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_FogOfWarService_0_5",{get:function(){return null==this.__FogOfWarService_0_5&&(this.__FogOfWarService_0_5=new _.a),this.__FogOfWarService_0_5},enumerable:!0,configurable:!0}),e.prototype.createInternal=function(t){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-root",o.EMPTY_INLINE_ARRAY,t,null),this.compView_0=new w(this.viewUtils,this,0,this._el_0),this._AppComponent_0_3=new f,this.compView_0.create(this._AppComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new u.a(0,this,this._el_0,this._AppComponent_0_3.context)},e.prototype.injectorGetInternal=function(t,e,n){return t===i.a&&0===e?this._AppComponent_0_3.context:t===s.a&&0===e?this._GameStateService_0_4:t===_.a&&0===e?this._FogOfWarService_0_5:n},e.prototype.detectChangesInternal=function(t){this._AppComponent_0_3.ngDoCheck(this,this._el_0,t),this.compView_0.internalDetectChanges(t)},e.prototype.destroyInternal=function(){this.compView_0.destroy()},e.prototype.visitRootNodesInternal=function(t,e){t(this._el_0,e)},e}(r.a),m=new u.b("app-root",y,i.a),b=["[_nghost-%COMP%] {\n      height: 100%;\n    }"],v=o.createRenderComponentType("",0,a.b.Emulated,b,{}),w=function(t){function e(n,i,r,o){t.call(this,e,v,h.a.COMPONENT,n,i,r,o,c.b.CheckAlways)}return d(e,t),e.prototype.createInternal=function(t){var e=this.renderer.createViewRoot(this.parentElement);return this._el_0=o.createRenderElement(this.renderer,e,"slash-map",o.EMPTY_INLINE_ARRAY,null),this.compView_0=new p.a(this.viewUtils,this,0,this._el_0),this._MapComponent_0_3=new p.b(this.parentView.injectorGet(s.a,this.parentIndex),this.parentView.injectorGet(_.a,this.parentIndex)),this.compView_0.create(this._MapComponent_0_3.context),this.init(null,this.renderer.directRenderer?null:[this._el_0],null),null},e.prototype.injectorGetInternal=function(t,e,n){return t===l.a&&0===e?this._MapComponent_0_3.context:n},e.prototype.detectChangesInternal=function(t){this._MapComponent_0_3.ngDoCheck(this,this._el_0,t),this.compView_0.internalDetectChanges(t)},e.prototype.destroyInternal=function(){this.compView_0.destroy()},e}(r.a)},333:function(t,e,n){"use strict";var i=n(124),r=n(341),o=n(171),a=n(183),s=n(142),_=n(199),h=n(315),c=n(317),u=n(58),l=n(77),p=n(87),d=n(78),f=n(46),g=n(98),y=n(39),m=n(99),b=n(97),v=n(147),w=n(113),R=n(31),O=n(143),C=n(64),E=n(139),S=n(92),P=n(210),I=n(140),L=n(332),M=n(123),A=n(59),k=n(144),D=n(145),H=n(63),T=n(96),N=n(81),G=n(121),j=n(66),V=n(95),x=n(86),z=n(127),U=n(115),F=n(116),W=n(65),B=n(212);n.d(e,"a",function(){return K});var X=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},Y=function(t){function e(e){t.call(this,e,[L.a],[L.a])}return X(e,t),Object.defineProperty(e.prototype,"_LOCALE_ID_7",{get:function(){return null==this.__LOCALE_ID_7&&(this.__LOCALE_ID_7=a.a(this.parent.get(M.a,null))),this.__LOCALE_ID_7},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_NgLocalization_8",{get:function(){return null==this.__NgLocalization_8&&(this.__NgLocalization_8=new u.a(this._LOCALE_ID_7)),this.__NgLocalization_8},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_ApplicationRef_13",{get:function(){return null==this.__ApplicationRef_13&&(this.__ApplicationRef_13=this._ApplicationRef__12),this.__ApplicationRef_13},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_Compiler_14",{get:function(){return null==this.__Compiler_14&&(this.__Compiler_14=new f.a),this.__Compiler_14},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_APP_ID_15",{get:function(){return null==this.__APP_ID_15&&(this.__APP_ID_15=A.a()),this.__APP_ID_15},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_DOCUMENT_16",{get:function(){return null==this.__DOCUMENT_16&&(this.__DOCUMENT_16=s.a()),this.__DOCUMENT_16},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_HAMMER_GESTURE_CONFIG_17",{get:function(){return null==this.__HAMMER_GESTURE_CONFIG_17&&(this.__HAMMER_GESTURE_CONFIG_17=new g.a),this.__HAMMER_GESTURE_CONFIG_17},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_EVENT_MANAGER_PLUGINS_18",{get:function(){return null==this.__EVENT_MANAGER_PLUGINS_18&&(this.__EVENT_MANAGER_PLUGINS_18=[new k.a,new D.a,new g.b(this._HAMMER_GESTURE_CONFIG_17)]),this.__EVENT_MANAGER_PLUGINS_18},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_EventManager_19",{get:function(){return null==this.__EventManager_19&&(this.__EventManager_19=new y.a(this._EVENT_MANAGER_PLUGINS_18,this.parent.get(H.a))),this.__EventManager_19},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_AnimationDriver_21",{get:function(){return null==this.__AnimationDriver_21&&(this.__AnimationDriver_21=s.b()),this.__AnimationDriver_21},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_DomRootRenderer_22",{get:function(){return null==this.__DomRootRenderer_22&&(this.__DomRootRenderer_22=new b.a(this._DOCUMENT_16,this._EventManager_19,this._DomSharedStylesHost_20,this._AnimationDriver_21,this._APP_ID_15)),this.__DomRootRenderer_22},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_RootRenderer_23",{get:function(){return null==this.__RootRenderer_23&&(this.__RootRenderer_23=T.a(this._DomRootRenderer_22,this.parent.get(T.b,null),this.parent.get(d.a,null))),this.__RootRenderer_23},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_DomSanitizer_24",{get:function(){return null==this.__DomSanitizer_24&&(this.__DomSanitizer_24=new v.a),this.__DomSanitizer_24},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_Sanitizer_25",{get:function(){return null==this.__Sanitizer_25&&(this.__Sanitizer_25=this._DomSanitizer_24),this.__Sanitizer_25},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_AnimationQueue_26",{get:function(){return null==this.__AnimationQueue_26&&(this.__AnimationQueue_26=new w.a(this.parent.get(H.a))),this.__AnimationQueue_26},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_ViewUtils_27",{get:function(){return null==this.__ViewUtils_27&&(this.__ViewUtils_27=new R.ViewUtils(this._RootRenderer_23,this._Sanitizer_25,this._AnimationQueue_26)),this.__ViewUtils_27},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_IterableDiffers_28",{get:function(){return null==this.__IterableDiffers_28&&(this.__IterableDiffers_28=a.b()),this.__IterableDiffers_28},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_KeyValueDiffers_29",{get:function(){return null==this.__KeyValueDiffers_29&&(this.__KeyValueDiffers_29=a.c()),this.__KeyValueDiffers_29},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_SharedStylesHost_30",{get:function(){return null==this.__SharedStylesHost_30&&(this.__SharedStylesHost_30=this._DomSharedStylesHost_20),this.__SharedStylesHost_30},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_Title_31",{get:function(){return null==this.__Title_31&&(this.__Title_31=new O.a),this.__Title_31},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_RadioControlRegistry_32",{get:function(){return null==this.__RadioControlRegistry_32&&(this.__RadioControlRegistry_32=new C.a),this.__RadioControlRegistry_32},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_BrowserXhr_33",{get:function(){return null==this.__BrowserXhr_33&&(this.__BrowserXhr_33=new E.a),this.__BrowserXhr_33},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_ResponseOptions_34",{get:function(){return null==this.__ResponseOptions_34&&(this.__ResponseOptions_34=new S.a),this.__ResponseOptions_34},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_XSRFStrategy_35",{get:function(){return null==this.__XSRFStrategy_35&&(this.__XSRFStrategy_35=c.a()),this.__XSRFStrategy_35},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_XHRBackend_36",{get:function(){return null==this.__XHRBackend_36&&(this.__XHRBackend_36=new P.a(this._BrowserXhr_33,this._ResponseOptions_34,this._XSRFStrategy_35)),this.__XHRBackend_36},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_RequestOptions_37",{get:function(){return null==this.__RequestOptions_37&&(this.__RequestOptions_37=new I.a),this.__RequestOptions_37},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_Http_38",{get:function(){return null==this.__Http_38&&(this.__Http_38=c.b(this._XHRBackend_36,this._RequestOptions_37)),this.__Http_38},enumerable:!0,configurable:!0}),e.prototype.createInternal=function(){return this._CommonModule_0=new o.a,this._ApplicationModule_1=new a.d,this._BrowserModule_2=new s.c(this.parent.get(s.c,null)),this._InternalFormsSharedModule_3=new _.a,this._FormsModule_4=new h.a,this._HttpModule_5=new c.c,this._AppModule_6=new r.a,this._ErrorHandler_9=s.d(),this._ApplicationInitStatus_10=new l.a(this.parent.get(l.b,null)),this._Testability_11=new p.a(this.parent.get(H.a)),this._ApplicationRef__12=new d.b(this.parent.get(H.a),this.parent.get(N.a),this,this._ErrorHandler_9,this,this._ApplicationInitStatus_10,this.parent.get(p.b,null),this._Testability_11),this._DomSharedStylesHost_20=new m.a(this._DOCUMENT_16),this._AppModule_6},e.prototype.getInternal=function(t,e){return t===o.a?this._CommonModule_0:t===a.d?this._ApplicationModule_1:t===s.c?this._BrowserModule_2:t===_.a?this._InternalFormsSharedModule_3:t===h.a?this._FormsModule_4:t===c.c?this._HttpModule_5:t===r.a?this._AppModule_6:t===M.a?this._LOCALE_ID_7:t===u.b?this._NgLocalization_8:t===G.a?this._ErrorHandler_9:t===l.a?this._ApplicationInitStatus_10:t===p.a?this._Testability_11:t===d.b?this._ApplicationRef__12:t===d.c?this._ApplicationRef_13:t===f.a?this._Compiler_14:t===A.b?this._APP_ID_15:t===j.a?this._DOCUMENT_16:t===g.c?this._HAMMER_GESTURE_CONFIG_17:t===y.b?this._EVENT_MANAGER_PLUGINS_18:t===y.a?this._EventManager_19:t===m.a?this._DomSharedStylesHost_20:t===V.a?this._AnimationDriver_21:t===b.b?this._DomRootRenderer_22:t===x.a?this._RootRenderer_23:t===v.b?this._DomSanitizer_24:t===z.a?this._Sanitizer_25:t===w.a?this._AnimationQueue_26:t===R.ViewUtils?this._ViewUtils_27:t===U.a?this._IterableDiffers_28:t===F.a?this._KeyValueDiffers_29:t===m.b?this._SharedStylesHost_30:t===O.a?this._Title_31:t===C.a?this._RadioControlRegistry_32:t===E.a?this._BrowserXhr_33:t===S.b?this._ResponseOptions_34:t===W.a?this._XSRFStrategy_35:t===P.a?this._XHRBackend_36:t===I.b?this._RequestOptions_37:t===B.a?this._Http_38:e},e.prototype.destroyInternal=function(){this._ApplicationRef__12.ngOnDestroy(),this._DomSharedStylesHost_20.ngOnDestroy()},e}(i.a),K=new i.b(Y,r.a)},334:function(t,e,n){"use strict";var i=n(219),r=n(84),o=n(31),a=n(62),s=n(37),_=n(36),h=n(47),c=n(48),u=n(68),l=n(67);n.d(e,"b",function(){return d}),n.d(e,"a",function(){return b});var p=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},d=function(){function t(t,e,n){this._changed=!1,this.context=new i.a(t,e,n)}return t.prototype.ngOnDetach=function(t,e,n){},t.prototype.ngOnDestroy=function(){},t.prototype.ngDoCheck=function(t,e,n){var i=this._changed;return this._changed=!1,n||0===t.numberOfChecks&&this.context.ngOnInit(),i},t.prototype.checkHost=function(t,e,n,i){},t.prototype.handleEvent=function(t,e){var n=!0;return n},t.prototype.subscribe=function(t,e){this._eventHandler=e},t}(),f=o.createRenderComponentType("",0,a.b.None,[],{}),g=function(t){function e(n,i,r,o){t.call(this,e,f,s.a.HOST,n,i,r,o,_.b.CheckAlways)}return p(e,t),e.prototype.createInternal=function(t){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"fog-of-war",o.EMPTY_INLINE_ARRAY,t,null),this.compView_0=new b(this.viewUtils,this,0,this._el_0),this._FogOfWarComponent_0_3=new d(new c.a(this._el_0),this.injectorGet(u.a,this.parentIndex),this.injectorGet(l.a,this.parentIndex)),this.compView_0.create(this._FogOfWarComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._FogOfWarComponent_0_3.context)},e.prototype.injectorGetInternal=function(t,e,n){return t===i.a&&0===e?this._FogOfWarComponent_0_3.context:n},e.prototype.detectChangesInternal=function(t){this._FogOfWarComponent_0_3.ngDoCheck(this,this._el_0,t),this.compView_0.internalDetectChanges(t)},e.prototype.destroyInternal=function(){this.compView_0.destroy()},e.prototype.visitRootNodesInternal=function(t,e){t(this._el_0,e)},e}(r.a),y=(new h.b("fog-of-war",g,i.a),["[_nghost-%COMP%] {\n        height: 100%;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        z-index: 800;\n        pointer-events: none;\n        overflow:hidden;\n    }\n\n    #canvas[_ngcontent-%COMP%] {\n        height:100%;\n    }"]),m=o.createRenderComponentType("",0,a.b.Emulated,y,{}),b=function(t){function e(n,i,r,o){t.call(this,e,m,s.a.COMPONENT,n,i,r,o,_.b.CheckAlways)}return p(e,t),e.prototype.createInternal=function(t){var e=this.renderer.createViewRoot(this.parentElement);return this._el_0=o.createRenderElement(this.renderer,e,"div",new o.InlineArray2(2,"id","canvas"),null),this._el_1=o.createRenderElement(this.renderer,this._el_0,"canvas",o.EMPTY_INLINE_ARRAY,null),this.init(null,this.renderer.directRenderer?null:[this._el_0,this._el_1],null),null},e}(r.a)},335:function(t,e,n){"use strict";var i=n(220),r=n(84),o=n(31),a=n(62),s=n(37),_=n(36),h=n(47),c=n(68),u=n(67),l=n(219),p=n(334),d=n(48);n.d(e,"b",function(){return g}),n.d(e,"a",function(){return w});var f=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},g=function(){function t(t,e){this._changed=!1,this.context=new i.a(t,e)}return t.prototype.ngOnDetach=function(t,e,n){},t.prototype.ngOnDestroy=function(){},t.prototype.ngDoCheck=function(t,e,n){var i=this._changed;return this._changed=!1,n||0===t.numberOfChecks&&this.context.ngOnInit(),i},t.prototype.checkHost=function(t,e,n,i){},t.prototype.handleEvent=function(t,e){var n=!0;return n},t.prototype.subscribe=function(t,e){this._eventHandler=e},t}(),y=o.createRenderComponentType("",0,a.b.None,[],{}),m=function(t){function e(n,i,r,o){t.call(this,e,y,s.a.HOST,n,i,r,o,_.b.CheckAlways)}return f(e,t),e.prototype.createInternal=function(t){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"slash-map",o.EMPTY_INLINE_ARRAY,t,null),this.compView_0=new w(this.viewUtils,this,0,this._el_0),this._MapComponent_0_3=new g(this.injectorGet(c.a,this.parentIndex),this.injectorGet(u.a,this.parentIndex)),this.compView_0.create(this._MapComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._MapComponent_0_3.context)},e.prototype.injectorGetInternal=function(t,e,n){return t===i.a&&0===e?this._MapComponent_0_3.context:n},e.prototype.detectChangesInternal=function(t){this._MapComponent_0_3.ngDoCheck(this,this._el_0,t),this.compView_0.internalDetectChanges(t)},e.prototype.destroyInternal=function(){this.compView_0.destroy()},e.prototype.visitRootNodesInternal=function(t,e){t(this._el_0,e)},e}(r.a),b=(new h.b("slash-map",m,i.a),["[_nghost-%COMP%], #map[_ngcontent-%COMP%], #fow[_ngcontent-%COMP%] {\n      height: 100%;\n    }\n\n    #fow[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        z-index: 800;\n        pointer-events: none;\n    }\n\n    .leaflet-container[_ngcontent-%COMP%] {\n        background: #000;\n        outline: 0;\n    }"]),v=o.createRenderComponentType("",0,a.b.Emulated,b,{}),w=function(t){function e(n,i,r,o){t.call(this,e,v,s.a.COMPONENT,n,i,r,o,_.b.CheckAlways)}return f(e,t),e.prototype.createInternal=function(t){var e=this.renderer.createViewRoot(this.parentElement);return this._el_0=o.createRenderElement(this.renderer,e,"div",new o.InlineArray2(2,"id","map"),null),this._el_1=o.createRenderElement(this.renderer,e,"fog-of-war",o.EMPTY_INLINE_ARRAY,null),this.compView_1=new p.a(this.viewUtils,this,1,this._el_1),this._FogOfWarComponent_1_3=new p.b(new d.a(this._el_1),this.parentView.injectorGet(c.a,this.parentIndex),this.parentView.injectorGet(u.a,this.parentIndex)),this.compView_1.create(this._FogOfWarComponent_1_3.context),this.init(null,this.renderer.directRenderer?null:[this._el_0,this._el_1],null),null},e.prototype.injectorGetInternal=function(t,e,n){return t===l.a&&1===e?this._FogOfWarComponent_1_3.context:n},e.prototype.detectChangesInternal=function(t){this._FogOfWarComponent_1_3.ngDoCheck(this,this._el_1,t),this.compView_1.internalDetectChanges(t)},e.prototype.destroyInternal=function(){this.compView_1.destroy()},e}(r.a)},336:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i;!function(t){t[t.Small=1.524]="Small",t[t.Medium=1.524]="Medium",t[t.Large=3.048]="Large",t[t.Huge=4.572]="Huge",t[t.Gargantuan=6.096]="Gargantuan",t[t.Colossal=9.144]="Colossal"}(i||(i={}))},337:function(t,e,n){"use strict";var i=n(149);n.d(e,"a",function(){return r});var r=function(){function t(t,e,n){this.imageUrl=t,this.imageWidth=e,this.imageHeight=n}return t.prototype.addToLayer=function(t){if(this.imageOverlay)this.imageOverlay.remove();else{var e=L.latLngBounds([[0,0],[this.imageWidth,this.imageHeight]]);this.imageOverlay=L.imageOverlay(this.imageUrl,e,{pane:i.a.background.toString()})}t.addLayer(this.imageOverlay)},t.prototype.getBounds=function(){return this.imageOverlay.getBounds()},t}()},338:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(){this.tokens=[]}return t}()},339:function(t,e,n){"use strict";var i=n(149);n.d(e,"a",function(){return r});var r=function(){function t(t,e,n){this.imageUrl=t,this.position=this.snapToGrid(e),this.size=n,this.outlineColor="#f00",this.showOutline=!0}return t.prototype.addToLayer=function(t){var e=this;this.tokenPoly?this.tokenOverlay.remove():(this.tokenPoly=L.polygon([this.position,L.latLng(this.position.lat+this.size,this.position.lng),L.latLng(this.position.lat+this.size,this.position.lng+this.size),L.latLng(this.position.lat,this.position.lng+this.size)],{draggable:!0,fillOpacity:0,pane:i.a.token.toString()}),this.tokenPoly.on("drag",function(t){e.tokenOverlay.setBounds(e.tokenPoly.getBounds())}),this.tokenPoly.on("dragend",function(t){var n=e.snapToGrid(e.tokenPoly.getBounds().getSouthWest());e.tokenPoly.setLatLngs([n,L.latLng(n.lat+e.size,n.lng),L.latLng(n.lat+e.size,n.lng+e.size),L.latLng(n.lat,n.lng+e.size)]),e.tokenOverlay.setBounds(e.tokenPoly.getBounds())})),this.tokenOverlay?this.tokenOverlay.remove():this.tokenOverlay=L.imageOverlay(this.imageUrl,this.tokenPoly.getBounds(),{interactive:!0,pane:i.a.token.toString()}),t.addLayer(this.tokenPoly),t.addLayer(this.tokenOverlay)},t.prototype.snapToGrid=function(t){var e=1.524*Math.round(t.lat/1.524),n=1.524*Math.round(t.lng/1.524);return L.latLng(e,n)},t}()},340:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(){}return t}()},341:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(){}return t}()},342:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={production:!0}},505:function(t,e,n){t.exports=n(264)},67:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(){}return t.prototype.getRenderer=function(){var t=this;return new Promise(function(e){t.renderer||t.init(),e(t.renderer)})},t.prototype.setMap=function(t){var e=this;this.map=t,this.zoomLevel=this.map.getZoom(),this.outCanvas=$("canvas","#canvas")[0];var n=$("#canvas");this.canvasWidth=n.outerWidth(),this.canvasHeight=n.outerHeight(),this.renderer||this.init(),this.map.addEventListener("movestart move moveend zoomend",function(){e.setViewPort()}),this.setSize(),this.setViewPort(),window.addEventListener("resize",function(){e.setSize()})},t.prototype.setViewPort=function(){var t=this.map.project(L.latLng(45.72,45.72),this.map.getZoom()),e=this.map.latLngToContainerPoint(L.latLng(0,0)),n=e.x,i=e.y-this.canvasHeight;this.renderer.setViewport(n,-i,t.x,Math.abs(t.y)),this.render()},t.prototype.setSize=function(){var t=$("#canvas");this.canvasWidth=t.outerWidth(),this.canvasHeight=t.outerHeight(),this.outCanvas.width=this.canvasWidth,this.outCanvas.height=this.canvasHeight,this.renderer.setSize(this.canvasWidth,this.canvasHeight)},t.prototype.init=function(){this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(25,1,.1,1e3),this.camera.position.set(22.86,22.86,100);var t=new THREE.BoxGeometry(45.72,45.72,1),e=new THREE.MeshPhongMaterial({color:16777215,shading:THREE.SmoothShading}),n=new THREE.Mesh(t,e);n.position.set(22.86,22.86,0),this.scene.add(n);var i=22.86,r=new THREE.PointLight(16777215,100,10,10);r.position.set(i,i,1.524),this.scene.add(r),this.scene.background=new THREE.Color(16777215),this.renderer=new THREE.WebGLRenderer({alpha:!0}),this.renderer.setSize(300,300),this.render()},t.prototype.render=function(){this.renderer.render(this.scene,this.camera),this.addChromaKey()},t.prototype.addChromaKey=function(){var t=this.outCanvas.getContext("2d");t.clearRect(0,0,this.canvasWidth,this.canvasHeight),t.drawImage(this.renderer.domElement,0,0,this.canvasWidth,this.canvasHeight);for(var e=t.getImageData(0,0,this.canvasWidth,this.canvasHeight),n=e.data.length/4,i=0;i<n;i++){var r=e.data[4*i+0];e.data[4*i+1],e.data[4*i+2];e.data[4*i+3]=255-r}t.clearRect(0,0,this.canvasWidth,this.canvasHeight),t.putImageData(e,0,0)},t}()},68:function(t,e,n){"use strict";var i=n(338),r=n(337),o=n(339),a=n(336);n.d(e,"a",function(){return s});var s=function(){function t(){}return t.prototype.getMap=function(){var t="http://i.imgur.com/2okhBTl.png",e=new r.a("http://imgur.com/KHt68Bj.png",45.72,45.72),n=new i.a;return n.map=e,n.tokens.push(new o.a(t,L.latLng(22.86,22.86),a.a.Medium)),n},t}()}},[505]);