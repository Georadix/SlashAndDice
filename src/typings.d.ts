declare module L {
    export interface PolylineOptions {
        draggable?: boolean;
    }

    export function simpleGraticule(options:any):any;

    export namespace control {
        export function mousePosition(options?: any): Control;
    }
}

declare module THREE {
    export class ColladaLoader extends Loader{
        options:{
            centerGeometry:boolean,
            convertUpAxis:boolean,
            subdivideFaces:boolean,
            upAxis:string,
            defaultEnvMap:any
        };

        load ( url:string, readyCallback:Function, progressCallback?:Function, failCallback?:Function ):void;
    }
}