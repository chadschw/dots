import { Injectable } from '@angular/core';
import { GameOptions } from './game-options';
import { Game } from './game';
import { Collide } from './collide';

@Injectable() 
export class DotsService {

    Start(gameOptions: GameOptions, context: CanvasRenderingContext2D) {
        this.game = Collide.Create(gameOptions);
        this.context = context;
        setInterval(() => { this.GameLoop(); }, 30);
    }

    UpdateGameOptions(options: GameOptions) {
        this.game.UpdateGameOptions(options);
    }

    private GameLoop() {
        this.game.Loop(this.context);
    }

    private context: CanvasRenderingContext2D;
    private game: Game;
}