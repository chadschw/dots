import { Injectable } from '@angular/core';
import { GameOptions } from './game-options';
import { Game } from './game';
import { Collide } from './games/collide';
import { Control } from './games/control';
import { Gravity } from './games/gravity';

@Injectable() 
export class DotsService {

    Start(gameOptions: GameOptions, context: CanvasRenderingContext2D) {
        //this.game = Collide.Create(gameOptions);
        this.game = Control.Create(gameOptions);
        this.context = context;
        setInterval(() => { this.GameLoop(); }, 30);
    }

    UpdateGameOptions(options: GameOptions) {
        this.game.UpdateGameOptions(options);
    }

    SetGame(name: string): void {
        if (name === 'spew') {
            this.game = Collide.Create(this.game.Options);
        }
        else if (name === 'control') {
            this.game = Control.Create(this.game.Options);
        } else if (name === 'gravity') {
            this.game = Gravity.Create(this.game.Options);
        }
    }

    private GameLoop() {
        this.game.Loop(this.context);
    }

    KeyDown(key: number) {
        this.game.Options.KeyDown(key);
    }

    KeyUp(key: number) {
        this.game.Options.KeyUp(key);
    }

    MouseDown(x: number, y: number) {
        this.game.Options.MouseDown(x, y);
    } 

    MouseUp(x: number, y: number) {
        this.game.Options.MouseUp(x, y);
    }

    MouseMove(x: number, y: number) {
        this.game.Options.MouseMove(x, y);
    }

    private context: CanvasRenderingContext2D;
    private game: Game;
}