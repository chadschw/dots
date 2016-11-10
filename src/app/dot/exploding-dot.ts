
import {Dot} from "./dot";

export class ExplodingDot extends Dot {

  get Ttl(): number {
    return this.ttl;
  }
  set Ttl(newTtl: number) {
    this.ttl = newTtl;
    this.alphaStep = 1/this.ttl;
  }

  private constructor(x: number, y: number, maxX: number, maxY: number, ttl: number) {
    super(x, y, maxX, maxY);
    this.Ttl = ttl;
  }

  static CreateExplodingDot(x: number, y: number, maxX: number, maxY: number, ttl: number): ExplodingDot {
    let newExplodingDot = new ExplodingDot(
      x,
      y,
      maxX,
      maxY,
      ttl
    );

    newExplodingDot.vx *= 10;
    newExplodingDot.vy *= 10;

    return newExplodingDot;
  }

  static CreateFragments(dot: Dot, numFragments: number): ExplodingDot[] {
    let fragments: ExplodingDot[] = [];
    for (let i = 0; i < numFragments; i++) {
      fragments.push(
        ExplodingDot.CreateExplodingDot(
          dot.x,
          dot.y,
          dot.maxX,
          dot.maxY,
          50)
      );
    }

    return fragments;
  }

  Draw(context: CanvasRenderingContext2D) {
    console.log(this.color.alpha);
    this.color.alpha -= this.alphaStep;
    super.Draw(context);
    this.Ttl--;
  }

  private alphaStep: number;
  private ttl: number;
}
