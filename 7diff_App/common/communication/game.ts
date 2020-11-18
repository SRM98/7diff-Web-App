import { Score } from "./score";

export enum pointOfView {
    simpleGamePOV = "simpleGame",
    freeGamePOV = "freeGame",
}

export interface Game {
    id: number;
    name: string;
    thumbnail: string;
    hsSolo: Array<Score>;
    hs1VS1: Array<Score>;
    POV: pointOfView;
}

export interface SimpleGame extends Game {
    originalImg:string| any;
    modifiedImg:string| any;
    modifiedGameImg: string|any;
}

export interface FreeGame extends Game {
    originalScene : string;
    modifiedScene : string;
}

export interface WaitingGame {
    id: number;
    roomname: string;
}

export interface Alert {
    data: string;
    gameURL: string;
}

export interface GameScenes {
    originalScene: string;
    modifiedScene: string;
}

export interface GameInterface {
    game: Game;
    playButtonText: string;
}