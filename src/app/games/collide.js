"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game_1 = require('../game');
var dot_1 = require('../dot');
var Collide = (function (_super) {
    __extends(Collide, _super);
    function Collide(options) {
        _super.call(this, options);
        this.tick = 0;
        this.dots = [];
        this.Reset();
    }
    Collide.Create = function (options) {
        return new Collide(options);
    };
    Collide.prototype.Reset = function () {
        this.dots = [];
        this.tick = 0;
    };
    Collide.prototype.OptionsUpdated = function () {
        var _this = this;
        this.dots.forEach(function (dot) {
            dot.maxX = _this.Options.Width;
            dot.maxY = _this.Options.Height;
        });
    };
    Collide.prototype.Loop = function (context) {
        this.CreateDot();
        this.Step();
        this.Draw(context);
        this.tick++;
    };
    Collide.prototype.CreateDot = function () {
        if (this.dots.length < 500) {
            this.dots.push(dot_1.Dot.Create(this.Options.Width / 2, this.Options.Height / 2, this.Options.Width, this.Options.Height));
        }
    };
    Collide.prototype.Step = function () {
        this.dots.forEach(function (dot) {
            dot.Step();
        });
        for (var i = 0; i < this.dots.length; i++) {
            var dotA = this.dots[i];
            for (var j = i + 1; j < this.dots.length; j++) {
                var dotB = this.dots[j];
                dotA.Collide(dotB);
            }
        }
    };
    Collide.prototype.Draw = function (context) {
        this.FillBackground(context);
        this.dots.forEach(function (dot) {
            dot.Draw(context);
        });
    };
    Collide.prototype.FillBackground = function (context) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    };
    return Collide;
}(game_1.Game));
exports.Collide = Collide;
//# sourceMappingURL=collide.js.map