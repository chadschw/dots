import { GameOptions } from '../game-options';
import { Game } from '../game';
import { Dot } from '../dot';
import { DotColor } from '../dot-color';
import { MathUtil } from '../math';
import { KeyCodes } from '../key-codes';

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
        this.player1 = this.dots[0];
        this.player2 = this.dots[1];
        this.InitPlayerDot(this.player1, DotColor.CreateDotColor(0,0,0));
        this.InitPlayerDot(this.player2, DotColor.CreateDotColor(255,0,0));
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

    InitPlayerDot(playerDot: Dot, dotColor: DotColor) {
        playerDot.radius = 25;
        playerDot.color = dotColor;
    }

    OptionsUpdated() {
        this.dots.forEach(dot => {
            dot.maxX = this.Options.Width;
            dot.maxY = this.Options.Height;
        });
    }

    Loop(context: CanvasRenderingContext2D) {
        this.ApplyInputsToPlayerDots();
        this.StepDots();
        this.CollideDots();
        this.Draw(context);
    }

    private ApplyInputsToPlayerDots() {

        this.ApplyInputsToDot(
            this.player1,
            KeyCodes.w,
            KeyCodes.s,
            KeyCodes.a,
            KeyCodes.d);

        this.ApplyInputsToDot(
            this.player2,
            KeyCodes.up,
            KeyCodes.down,
            KeyCodes.left,
            KeyCodes.right);
    }

    private ApplyInputsToDot(dot: Dot, up: number, down: number, left: number, right: number) {
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
                    if (dotA === this.player1 && dotB === this.player2) 
                    {
                        if (this.player1.radius > this.player2.radius) {
                            this.dots.splice(j,1);
                        } else {
                            this.dots.splice(i,1);
                        }
                    } else if (dotA === this.player1) {
                        this.player1.radius += 0.1;
                        this.dots.splice(j, 1);
                    } else if (dotA === this.player2) {
                        this.player2.radius += 0.1;
                        this.dots.splice(j, 1);
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
    }

    private FillBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    }

    private dots: Dot[] = [];
    private player1: Dot;
    private player2: Dot;
}