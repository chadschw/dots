
import { MathUtil } from '../util/math';
import { DotColor } from '../dot/dot-color';

export class Dot {
    constructor(
        public x: number,
        public y: number,
        public maxX: number,
        public maxY: number,
    ) { }

    static Create(x: number, y: number, maxX: number, maxY: number): Dot {
        return new Dot(x, y, maxX, maxY);
    }

    public vx = MathUtil.RandBetween(-2.0, 2.0);
    public vy = MathUtil.RandBetween(-2.0, 2.0);

    public gx = 0;
    public gy = 0.25;

    public radius = MathUtil.RandBetween(5.0, 10.0);
    public color: DotColor = DotColor.CreateRandomColor();

    public friction: number = 0.99;

    Step() {
        this.ApplyVelocity();
        this.CheckWallBounce();
        this.ApplyGravity();
    }

    ApplyVelocity() {
        this.x += this.vx;
        this.y += this.vy;
    }

    CheckWallBounce(): void {
        if (this.vx > 0 && this.x + this.radius > this.maxX) {
            this.vx *= -0.6;
        }

        if (this.vx < 0 && this.x - this.radius <= 0) {
            this.vx *= -0.6;
        }

        if (this.vy > 0 && this.y + this.radius > this.maxY) {
            this.vy *= -0.6;
        }

        if (this.vy < 0 && this.y - this.radius <= 0) {
            this.vy *= -0.6;
        }

        this.KeepInBounds();
    }

    KeepInBounds(): void {
        if (this.x + this.radius > this.maxX) {
            this.x = this.maxX - this.radius;
            this.vy *= this.friction;
        }
        else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vy *= this.friction;
        }

        if (this.y + this.radius > this.maxY) {
            this.y = this.maxY - this.radius;
            this.vx *= this.friction;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vx *= this.friction;
        }
    }

    ApplyGravity() {
        this.vx += this.gx;
        this.vy += this.gy;
    }

    Collide(otherDot: Dot) {
        var dx = otherDot.x - this.x;
        var dy = otherDot.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var minDistance = otherDot.radius + this.radius;

        if (distance < minDistance) {
            var tx = this.x + dx / distance * minDistance;
            var ty = this.y + dy / distance * minDistance;
            var ax = (tx - otherDot.x) * 0.9;
            var ay = (ty - otherDot.y) * 0.9;

            this.vx -= ax;
            this.vy -= ay;

            otherDot.vx += ax;
            otherDot.vy += ay;

            this.vx *= this.friction * 0.9;
            this.vy *= this.friction * 0.9;
            otherDot.vx *= this.friction * 0.9;
            otherDot.vy *= this.friction * 0.9;
        }
    }

    Draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        this.color.SetFillColor(context);
        context.arc( this.x, this.y, this.radius, 0, 2*3.14159, false);
        context.closePath();
        context.fill();
    }
}