import { GameOptions } from '../game/game-options';
import { Game } from '../game/game';
import { Dot } from '../dot/dot';
import { DotColor } from '../dot/dot-color';
import { MathUtil } from '../util/math';
import { KeyCodes } from '../game/key-codes';

export class Control extends Game {

    private constructor(options: GameOptions) {
        super(options);
        this.Reset();
    }

    static Create(options: GameOptions): Control {
        return new Control(options);
    }

    Reset(): void {
        this.CreateDots();
        this.InitControlledDot();
    }

    CreateDots() {
        var padding = 15;
        var minx = padding;
        var miny = padding;
        var maxx = this.Options.Width;
        var maxy = this.Options.Height;

        for(var i = 0; i < 500; i++) {
            var initx = MathUtil.RandBetweenInt(minx, maxx);
            var inity = MathUtil.RandBetweenInt(miny, maxy);

            var dot = Dot.Create(initx, inity, maxx, maxy);
            dot.gx = 0;
            dot.gy = 0;

            this.dots.push(dot);
        }
    }

    InitControlledDot() {
        this.controlledDot = this.dots[0];

        this.controlledDot.radius = 25;
        this.controlledDot.color = DotColor.CreateDotColor(0,0,0);
        this.controlledDot.gx = 0;
        this.controlledDot.gy = 0;
    }

    OptionsUpdated() {
        this.dots.forEach(dot => {
            dot.maxX = this.Options.Width;
            dot.maxY = this.Options.Height;
        });
    }

    Loop(context: CanvasRenderingContext2D) {
        this.ApplyInputsToControlledDot();
        this.StepDots();
        this.CollideDots();
        this.Draw(context);
    }

    private ApplyInputsToControlledDot() {
        var velocityAdjust = 1;
        if (this.Options.IsKeyDown(KeyCodes.w)) {
            this.controlledDot.vy -= velocityAdjust;
        }
        if (this.Options.IsKeyDown(KeyCodes.s)) {
            this.controlledDot.vy += velocityAdjust;
        }
        if (this.Options.IsKeyDown(KeyCodes.a)) {
            this.controlledDot.vx -= 5;
        }
        if (this.Options.IsKeyDown(KeyCodes.d)) {
            this.controlledDot.vx += 5;
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
                
                dotA.Collide(dotB);
            }
        }
    }

    private Draw(context: CanvasRenderingContext2D) {
        this.FillBackground(context);
        this.dots.forEach(dot => {
            dot.Draw(context);
        });

        this.controlledDot.Draw(context);
    }

    private FillBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    }

    private dots: Dot[] = [];
    private controlledDot: Dot;
}