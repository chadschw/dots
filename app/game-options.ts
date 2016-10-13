
export class GameOptions {

    Height: number;
    Width: number;

    private constructor() {}

    static Create(height: number, width: number) {
        var o = new GameOptions();
        o.Height = height;
        o.Width = width;

        return o;
    }
}