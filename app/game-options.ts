
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

    public KeyDown(key: number) {
        if (this.PressedKeys.indexOf(key) === -1) {
            this.PressedKeys.push(key);
            console.log(this.PressedKeys);
        }
    }
    
    public KeyUp(key: number) {
        var idx = this.PressedKeys.indexOf(key);
        if (idx !== -1) {
            this.PressedKeys.splice(idx, 1);
            console.log(this.PressedKeys);
        }
    }

    public IsKeyDown(key: number): boolean {
        return (this.PressedKeys.indexOf(key) !== -1);
    }
}