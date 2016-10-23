
export class Coord {
    X: number;
    Y: number;

    private constructor(x,y) {
        this.X = x;
        this.Y = y;
    }

    static Create(x, y) {
        return new Coord(x,y);
    }

    Delta(other: Coord): Coord {
        return Coord.Create(other.X - this.X, other.Y - this.Y);
    }
}