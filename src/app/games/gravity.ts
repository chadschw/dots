
import { Coord } from '../coord';
import { GameOptions } from '../game-options';
import { Game } from '../game';
import { Dot } from '../dot';
import { DotColor } from '../dot-color';
import { MathUtil } from '../math';
import { KeyCodes } from '../key-codes';

export class Gravity extends Game {

    private constructor(options: GameOptions) {
        super(options);
        this.Reset();
    }

    static Create(options: GameOptions): Gravity {
        return new Gravity(options);
    }

    Reset(): void {
        this.CreateDot();
    }

    CreateDot() {
        this.dot = Dot.Create(
            this.Options.Width/2, 
            this.Options.Height/2,
            this.Options.Width, 
            this.Options.Height);

        this.dot.gx = 0;
        this.dot.gy = 0.5;
    }

    OptionsUpdated() {
        this.dot.maxX = this.Options.Width;
        this.dot.maxY = this.Options.Height;
    }

    Loop(context: CanvasRenderingContext2D) {
        this.ApplyInputsToDot();
        this.CheckMouseAction();
        this.StepDots();
        this.Draw(context);
    }

    private ApplyInputsToDot() {
        var xVelocityAdjust = 1;
        var yVelocityAdjust = 1;
        if (this.Options.IsKeyDown(KeyCodes.w)) {
            this.dot.vy -= yVelocityAdjust;
        }
        if (this.Options.IsKeyDown(KeyCodes.s)) {
            this.dot.vy += yVelocityAdjust;
        }
        if (this.Options.IsKeyDown(KeyCodes.a)) {
            this.dot.vx -= xVelocityAdjust;
        }
        if (this.Options.IsKeyDown(KeyCodes.d)) {
            this.dot.vx += xVelocityAdjust;
        }
    }

    private oldMouseDown = false;
    private startMouseCoords: Coord;
    private CheckMouseAction() {
        var presMouseDown = this.Options.IsMouseDown();
        if (!this.oldMouseDown && presMouseDown) {
            this.startMouseCoords = Coord.Create(
                this.Options.MouseCoords.X, 
                this.Options.MouseCoords.Y);
        } else if (this.oldMouseDown && !presMouseDown) {
            var delta = this.startMouseCoords.Delta(this.Options.MouseCoords);
            this.dot.vx += delta.X/10;
            this.dot.vy += delta.Y/10;
        }
        this.oldMouseDown = presMouseDown;
    }

    private StepDots() {
        this.dot.Step();
    }

    private Draw(context: CanvasRenderingContext2D) {
        this.FillBackground(context);
        this.dot.Draw(context);
    }

    private FillBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    }

    private dot: Dot;
}