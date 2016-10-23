
import { GameOptions } from '../game-options';
import { Game } from '../game';
import { Dot } from '../dot';

export class Collide extends Game {

    private constructor(options: GameOptions) {
        super(options);
        this.Reset();
    }

    static Create(options: GameOptions): Collide {
        return new Collide(options);
    }

    Reset(): void {
        this.dots = [];
        this.tick = 0;
    }

    OptionsUpdated() {
        this.dots.forEach(dot => {
            dot.maxX = this.Options.Width;
            dot.maxY = this.Options.Height;
        });
    }

    Loop(context: CanvasRenderingContext2D) {
        this.CreateDot();
        this.Step();
        this.Draw(context);
        this.tick++;
    }

    private CreateDot() {
        if (this.dots.length < 500) {
            this.dots.push(Dot.Create(
                this.Options.Width/2,
                this.Options.Height/2,
                this.Options.Width,
                this.Options.Height
            ));
        }
    }

    private Step() {
        this.dots.forEach(dot => {
            dot.Step();
        });

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
    }

    private FillBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    }

    private tick: number = 0;
    private dots: Dot[] = [];
}