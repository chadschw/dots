import { MathUtil } from '../util/math';

export class DotColor {

    constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        public alpha: number = 255) {
            this.CreateRgbString();
        }

    Randomize() {
        this.r = MathUtil.RandBetweenInt(0, 255);
        this.g = MathUtil.RandBetweenInt(0, 255);
        this.b = MathUtil.RandBetweenInt(0, 255);
        this.CreateRgbString();
    }

    static CreateRandomColor(): DotColor {
        var color = new DotColor();
        color.Randomize();
        return color;
    }

    static CreateDotColor(r: number, g: number, b: number) {
        return new DotColor(r, g, b, 255);
    }

    SetFillColor(context: CanvasRenderingContext2D) {
        context.fillStyle = this.rgbString;
    }

    CreateRgbString() {
        this.rgbString = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }

    private rgbString: string;
}