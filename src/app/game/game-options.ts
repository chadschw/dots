import { Coord } from '../util/coord';

export class GameOptions {

    Height: number;
    Width: number;
    PressedKeys: number[] = [];

    private constructor() {}

    static Create(height: number, width: number) {
        var o = new GameOptions();
        o.Height = height;
        o.Width = width;

        return o;
    }

    KeyDown(key: number) {
        if (this.PressedKeys.indexOf(key) === -1) {
            this.PressedKeys.push(key);
            //console.log(this.PressedKeys);
        }
    }
    
    KeyUp(key: number) {
        var idx = this.PressedKeys.indexOf(key);
        if (idx !== -1) {
            this.PressedKeys.splice(idx, 1);
            //console.log(this.PressedKeys);
        }
    }

    IsKeyDown(key: number): boolean {
        return (this.PressedKeys.indexOf(key) !== -1);
    }

    private mouseDown = false;
    MouseCoords: Coord = Coord.Create(0,0);
    MouseDown(x: number, y: number) {
        this.mouseDown = true;
    }

    MouseUp(x: number, y: number) {
        this.mouseDown = false;
    }

    MouseMove(x: number, y: number) {
        this.MouseCoords.X = x;
        this.MouseCoords.Y = y;
    }

    IsMouseDown(): boolean {
        return this.mouseDown;
    }


}