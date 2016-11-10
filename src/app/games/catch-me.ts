import { GameOptions } from '../game/game-options';
import { Game } from '../game/game';
import { Dot } from '../dot/dot';
import { DotColor } from '../dot/dot-color';
import { MathUtil } from '../util/math';
import { KeyCodes } from '../game/key-codes';
import {ExplodingDot} from "../dot/exploding-dot";

export class CatchMe extends Game {

  private constructor(options: GameOptions) {
    super(options);
    this.Reset();
  }

  static Create(options: GameOptions): CatchMe {
    return new CatchMe(options);
  }

  Reset(): void {
    this.CreateDots();
    this.CreatePlayerDots();
  }

  CreateDots() {
    var padding = 15;
    var minx = padding;
    var miny = padding;
    var maxx = this.Options.Width;
    var maxy = this.Options.Height;

    for(var i = 0; i < 100; i++) {
      var initx = MathUtil.RandBetweenInt(minx, maxx);
      var inity = MathUtil.RandBetweenInt(miny, maxy);

      var dot = Dot.Create(initx, inity, maxx, maxy);
      dot.gx = 0;
      dot.gy = 0;

      this.dots.push(dot);
    }
  }

  CreatePlayerDots() {
    this.p1 = this.dots[0];
    this.p1.radius = 25;
    this.p1.color = DotColor.CreateDotColor(0,0,0);

    this.p2 = this.dots[1];
    this.p2.radius = 25;
    this.p2.color = DotColor.CreateDotColor(255, 255, 255);
  }

  OptionsUpdated() {
    this.dots.forEach(dot => {
      dot.maxX = this.Options.Width;
      dot.maxY = this.Options.Height;
    });
  }

  Loop(context: CanvasRenderingContext2D) {
    this.ApplyInputsToPlayerDot(this.p1, KeyCodes.w, KeyCodes.a, KeyCodes.s, KeyCodes.d);
    this.ApplyInputsToPlayerDot(this.p2, KeyCodes.up, KeyCodes.left, KeyCodes.down, KeyCodes.right);
    this.StepDots();
    this.CollideDots();
    this.Draw(context);
  }

  private ApplyInputsToPlayerDot(dot: Dot, up: number, left: number, down: number, right: number) {
    var velocityAdjust = 1;
    if (this.Options.IsKeyDown(up)) {
      dot.vy -= velocityAdjust;
    }
    if (this.Options.IsKeyDown(down)) {
      dot.vy += velocityAdjust;
    }
    if (this.Options.IsKeyDown(left)) {
      dot.vx -= velocityAdjust;
    }
    if (this.Options.IsKeyDown(right)) {
      dot.vx += velocityAdjust;
    }
  }

  private StepDots() {
    this.dots.forEach(dot => {
      dot.Step();
    });
  }

  private CollideDots() {
    // Collide each dot with every other dot exactly once.
    for (var i = 0; i < this.dots.length; i++) {
      var dotA = this.dots[i];

      for (var j = i+1; j < this.dots.length; j++) {
        var dotB = this.dots[j];

        if (dotA.Collide(dotB)) {
          if (dotA === this.p1 && dotB === this.p2) {
            continue;
          }

          if (dotA === this.p1 || dotA === this.p2) {
            this.dots.splice(j, 1);
            var fragments = ExplodingDot.CreateFragments(dotB, 10);
            this.dotFragments = this.dotFragments.concat(fragments);
          }
        }
      }
    }
  }

  private Draw(context: CanvasRenderingContext2D) {
    this.FillBackground(context);
    this.dots.forEach(dot => {
      dot.Draw(context);
    });

    this.StepFragments();
    this.DrawFragments(context);
  }

  private StepFragments() {
    this.dotFragments.forEach(fragment => {
      fragment.Step();
    })
  }

  private DrawFragments(context: CanvasRenderingContext2D) {
    for (let i = this.dotFragments.length -1; i >= 0; i--) {
      let fragment = this.dotFragments[i];
      fragment.Draw(context);
      if (fragment.Ttl === 0) {
        this.dotFragments.splice(i, 1);
      }
    }
  }

  private FillBackground(context: CanvasRenderingContext2D) {
    context.fillStyle = "gray";
    context.fillRect(0, 0, this.Options.Width, this.Options.Height);
  }

  private dots: Dot[] = [];
  private p1: Dot;
  private p2: Dot;

  private dotFragments: ExplodingDot[] = [];
}
