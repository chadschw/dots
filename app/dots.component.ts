import { Component, OnInit } from '@angular/core';
import { DotsService } from './dots.service';
import { GameOptions } from './game-options';
import { KeyCodes } from './key-codes';

@Component({
    selector: 'dots',
    styles: [
        `
            #dots {
                z-index: 0;
            }

            #controls {
                background-color: #efefef;
                padding: 10px;
                font-family: 'verdana';
                font-size: 10px;
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 1;
            }

            a {
                color: black;
            }

            a.visited {
                color: black;
            }
        `
    ],
    template: `
        <canvas id='dots'></canvas>
        <div *ngIf="showControls" id="controls">
            Esc: Show/hide controls<br>
            Select Game:<br>
            <a href=# (click)="onSetGame('spew')">Spew</a><br>
            <a href=# (click)="onSetGame('control')">Control</a> w,a,s,d to move<br>
        </div>
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

        window.onkeydown = (event) => {
            this.onKeyDown(event);
            event.preventDefault();
        }

        window.onkeyup = (event) => {
            this.onKeyUp(event);
            event.preventDefault();
        }
    }

    private onResize() {
        this.SetCanvasSize();
        this.dotsService.UpdateGameOptions(this.CreateGameOptions());
    }

    private onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === KeyCodes.escape) {
            this.ToggleShowControls();
            return;
        }

        this.dotsService.KeyDown(event.keyCode);
    }

    private onKeyUp(event: KeyboardEvent) {
        this.dotsService.KeyUp(event.keyCode);
    }

    private showControls: boolean = true;
    private ToggleShowControls() {
        this.showControls = !this.showControls;
    }

    private onSetGame(name: string): void {
        this.dotsService.SetGame(name);
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