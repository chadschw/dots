import { Component, OnInit } from '@angular/core';
import { DotsService } from './dots.service';
import { GameOptions } from './game-options';

@Component({
    selector: 'dots',
    template: `
        <canvas id='dots'></canvas>
    `,
    providers: [
        DotsService
    ]
})
export class DotsComponent implements OnInit {

    constructor(private dotsService: DotsService) {
        window.onresize = () => {
            this.onResize();
        }
    }

    private onResize() {
        this.SetCanvasSize();
        this.dotsService.UpdateGameOptions(this.CreateGameOptions());
    }

    ngOnInit() {
        this.CreateCanvasElement();
        this.SetCanvasSize();
        this.CreateContext();
        this.dotsService.Start(this.CreateGameOptions(), this.context);
    }
    
    private CreateCanvasElement() {
        this.canvasElement = <HTMLCanvasElement>document.getElementById("dots");
    }

    private SetCanvasSize() {
        this.canvasElement.height = window.innerHeight;
        this.canvasElement.width = window.innerWidth;
    }

    private CreateContext() {
        this.context = this.canvasElement.getContext("2d");
    }

    private CreateGameOptions(): GameOptions {
        var gameOptions = GameOptions.Create(
            this.canvasElement.height,
            this.canvasElement.width);
        return gameOptions;
    }

    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
}