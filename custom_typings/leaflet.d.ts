declare module L {
    export interface PolylineOptions {
        draggable?: boolean;
    }

    export function simpleGraticule(options:any):any;

    export namespace control {
        export function mousePosition(options?: any): Control;
    }
}