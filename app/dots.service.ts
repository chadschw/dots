import { Injectable } from '@angular/core';
import { GameOptions } from './game-options';
import { Game } from './game';
import { Collide } from './games/collide';
import { Control } from './games/control';

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
        }
    }

    private GameLoop() {
        this.game.Loop(this.context);
    }

    public KeyDown(key: number) {
        this.game.Options.KeyDown(key);
    }

    public KeyUp(key: number) {
        this.game.Options.KeyUp(key);
    }

    private context: CanvasRenderingContext2D;
    private game: Game;
}