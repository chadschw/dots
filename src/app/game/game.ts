import { GameOptions } from './game-options';

export abstract class Game {

    constructor(public Options: GameOptions) {}

    abstract Loop(context: CanvasRenderingContext2D): void;
    UpdateGameOptions(options: GameOptions): void {
        this.Options = options;
        this.OptionsUpdated();
    }
    abstract OptionsUpdated(): void;
}