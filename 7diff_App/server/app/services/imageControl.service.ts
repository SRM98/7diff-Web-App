import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Converter } from "../converter";
import Types from "../types";
import { DifferencesService } from "./differences.service";
import { ImageService } from "./image.service";

interface GameInfos {
    name: string;
    arrayPixel: string[][];
    arrayOriginal: string[][];
    arrayModified: string[][];
    nbDiffs: number;

}

@injectable()
export class ImageControlService {

    public readonly SUBSTR_VALUE: number = 22;
    public bufferModified: Buffer;
    public arrayGames: GameInfos[];
    private converter: Converter;

    public constructor(@inject(Types.DifferencesService) private differencesService: DifferencesService,
                       @inject(Types.ImageService) private imageService: ImageService, ) {
                           this.arrayGames = [];
                           this.converter = new Converter();
                       }

    public newGame(req: Request): void {
        // tslint:disable-next-line:no-any
        const reqParsed: any = JSON.parse(req.body.value);
        if ( !this.isGameAlreadyCreated(reqParsed.URL)) {
        this.readHeader(reqParsed.game.originalImg, reqParsed.game.modifiedImg);
        const myobj: GameInfos = {name: reqParsed.URL,
                                  arrayPixel: this.imageService.arrayPixel,
                                  arrayOriginal: this.imageService.arrayOriginal,
                                  arrayModified: this.imageService.arrayModified, nbDiffs: 0};
        this.arrayGames.push(myobj);
        }
    }

    public getImg(req: Request, res: Response): void {
        const file: string = this.converter.imgToBase64("", this.differencesService.finalBuff);
        res.json({fichier: file});

    }

    public isGameAlreadyCreated(gameURL: string): boolean {
        let isAlreadyCreated: boolean = false;
        for (const gameInfo of this.arrayGames) {
            if (gameInfo.name === gameURL) {
                isAlreadyCreated = true;
            }
        }

        return isAlreadyCreated;
    }

    public findDifference(req: Request, res: Response): void {
        // tslint:disable-next-line:typedef
        const position = JSON.parse(req.body.value);
        const stringName: string = (req.body.URL);
        const index: number = this.findGame(stringName);
        if (index !== -1) {
            this.differencesService.allocate(this.arrayGames[index].arrayPixel,
                                             this.arrayGames[index].arrayOriginal, this.arrayGames[index].arrayModified);
            const nbDiff: number = this.differencesService.checkIfDifferent(position.X, position.Y,
                                                                            this.bufferModified);

            const file: string = this.converter.imgToBase64("", this.differencesService.finalBuff);

            res.json({diff: nbDiff, fichier: file});
            }
    }

    public readHeader(bufferOriginal: string, bufferModified: string): void {

        bufferOriginal = bufferOriginal.substr(this.SUBSTR_VALUE);
        bufferModified = bufferModified.substr(this.SUBSTR_VALUE);
        const buffOriginal: Buffer = Buffer.from(bufferOriginal, "base64");
        const buffModified: Buffer = Buffer.from(bufferModified, "base64");
        this.imageService.readFile(buffOriginal, buffModified);
        this.bufferModified = buffModified;
    }

    public deleteGame(req: Request): void {
        // tslint:disable-next-line:typedef
        const urlString = JSON.parse(req.body.value);
        const index: number = this.findGame(urlString.URL);
        if (index !== -1) {
        this.arrayGames.splice(index, 1);
        }
    }

    public findGame(name: string): number {
        for (let i: number = 0; i < this.arrayGames.length; i++) {
            if (this.arrayGames[i].name === name) {
                this.arrayGames[i].nbDiffs++;

                return i;
                }
            }

        return -1;
    }

}
