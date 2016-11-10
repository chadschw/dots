import { MathUtil } from '../util/math';

export class DotColor {

    get alpha(): number {
      return this._alpha;
    }

    set alpha(newAlpha: number) {
      this._alpha = newAlpha;
      this.CreateRgbaString();
    }

    constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        private _alpha: number = 1.0) {
            this.CreateRgbaString();
        }

    Randomize() {
        this.r = MathUtil.RandBetweenInt(0, 255);
        this.g = MathUtil.RandBetweenInt(0, 255);
        this.b = MathUtil.RandBetweenInt(0, 255);
        this.CreateRgbaString();
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
        context.fillStyle = this.rgbaString;
    }

    CreateRgbaString() {
        this.rgbaString =
          "rgba(" + this.r + "," +
                    this.g + "," +
                    this.b + "," +
                    this.alpha + ")";
    }

    private rgbaString: string;
}
