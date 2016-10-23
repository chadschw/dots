"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game_1 = require('../game');
var dot_1 = require('../dot');
var dot_color_1 = require('../dot-color');
var math_1 = require('../math');
var key_codes_1 = require('../key-codes');
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(options) {
        _super.call(this, options);
        this.dots = [];
        this.Reset();
    }
    Control.Create = function (options) {
        return new Control(options);
    };
    Control.prototype.Reset = function () {
        this.CreateDots();
        this.InitControlledDot();
    };
    Control.prototype.CreateDots = function () {
        var padding = 15;
        var minx = padding;
        var miny = padding;
        var maxx = this.Options.Width;
        var maxy = this.Options.Height;
        for (var i = 0; i < 500; i++) {
            var initx = math_1.MathUtil.RandBetweenInt(minx, maxx);
            var inity = math_1.MathUtil.RandBetweenInt(miny, maxy);
            var dot = dot_1.Dot.Create(initx, inity, maxx, maxy);
            dot.gx = 0;
            dot.gy = 0;
            this.dots.push(dot);
        }
    };
    Control.prototype.InitControlledDot = function () {
        this.controlledDot = this.dots[0];
        this.controlledDot.radius = 25;
        this.controlledDot.color = dot_color_1.DotColor.CreateDotColor(0, 0, 0);
        this.controlledDot.gx = 0;
        this.controlledDot.gy = 0;
    };
    Control.prototype.OptionsUpdated = function () {
        var _this = this;
        this.dots.forEach(function (dot) {
            dot.maxX = _this.Options.Width;
            dot.maxY = _this.Options.Height;
        });
    };
    Control.prototype.Loop = function (context) {
        this.ApplyInputsToControlledDot();
        this.StepDots();
        this.CollideDots();
        this.Draw(context);
    };
    Control.prototype.ApplyInputsToControlledDot = function () {
        var velocityAdjust = 1;
        if (this.Options.IsKeyDown(key_codes_1.KeyCodes.w)) {
            this.controlledDot.vy -= velocityAdjust;
        }
        if (this.Options.IsKeyDown(key_codes_1.KeyCodes.s)) {
            this.controlledDot.vy += velocityAdjust;
        }
        if (this.Options.IsKeyDown(key_codes_1.KeyCodes.a)) {
            this.controlledDot.vx -= 5;
        }
        if (this.Options.IsKeyDown(key_codes_1.KeyCodes.d)) {
            this.controlledDot.vx += 5;
        }
    };
    Control.prototype.StepDots = function () {
        this.dots.forEach(function (dot) {
            dot.Step();
        });
    };
    Control.prototype.CollideDots = function () {
        // Collide each dot with every other dot exactly once.
        for (var i = 0; i < this.dots.length; i++) {
            var dotA = this.dots[i];
            for (var j = i + 1; j < this.dots.length; j++) {
                var dotB = this.dots[j];
                dotA.Collide(dotB);
            }
        }
    };
    Control.prototype.Draw = function (context) {
        this.FillBackground(context);
        this.dots.forEach(function (dot) {
            dot.Draw(context);
        });
        this.controlledDot.Draw(context);
    };
    Control.prototype.FillBackground = function (context) {
        context.fillStyle = "gray";
        context.fillRect(0, 0, this.Options.Width, this.Options.Height);
    };
    return Control;
}(game_1.Game));
exports.Control = Control;
//# sourceMappingURL=control.js.map