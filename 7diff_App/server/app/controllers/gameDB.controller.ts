import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Converter } from "../converter";
import { FreeDiffService } from "../services/FreeGameDiff.service";
import { GameDBService } from "../services/gameDB.service";
import Types from "../types";

@injectable()
export class GameDBController {

    private readonly LISTOFGAMES_URL: string = "/listOfGames";
    private readonly DETAIL_URL: string = "/detail/:id";
    private readonly FREE_GAME_DETAIL_URL: string = "/freeGameDetail/:id";
    private readonly RESET_HS_URL: string = "/reseths/:id";
    private readonly DELETE_GAME_URL: string = "/deleteGame/:id";
    private readonly ADD_FREE_GAME_URL: string = "/addFreeGame";
    private readonly DELETE_GAME_IMG: string = "/deleteGame/image";
    private readonly ADD_WAITING_GAME_URL: string = "/addWaitingGame/:id";
    private readonly DELETE_WAITING_GAME_URL: string = "/deleteWaitingGame/:id";
    private readonly WAITING_GAME_URL: string = "/waitingGameDetail/:id";
    private readonly ADD_DIFF_OBJECT_URL: string = "/addDiffObject";
    private readonly WAITING_ROOM_URL: string = "/getWaitingRoom";

    private converter: Converter = new Converter();
    public constructor(@inject(Types.GameDBService) private gameDBService: GameDBService,
                       @inject(Types.FreeDiffService)private freeDiffService: FreeDiffService) { }

    public get router(): Router {
        const router: Router = Router();

    // GET requests

        router.get(this.LISTOFGAMES_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.getGames(req, res, next));

        router.get(this.DETAIL_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.getSimpleGame(req, res, next));

        router.get(this.FREE_GAME_DETAIL_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.getFreeGame(req, res, next));

        router.get(this.WAITING_GAME_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.getWaitingGame(req, res, next));
        router.get(this.WAITING_ROOM_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.getWaitingRoom(req, res, next));

    // PUT requests
        router.put(this.RESET_HS_URL,
                   (req: Request, res: Response, next: NextFunction) => this.gameDBService.updateHighScores(req, res, next));

    // POST requests

        router.post(this.ADD_DIFF_OBJECT_URL,
                    (req: Request, res: Response, next: NextFunction) => {
            res.json(this.freeDiffService.verifyDifference(req.body));
        });

        router.post(this.LISTOFGAMES_URL,
                    (req: Request, res: Response, next: NextFunction ) => this.gameDBService.addSimpleGame(req, res, next));

        router.post(this.ADD_FREE_GAME_URL,
                    (req: Request, res: Response, next: NextFunction ) => this.gameDBService.addFreeGame(req, res, next));

        router.post(this.DELETE_GAME_IMG, async(req: Request, res: Response) => {
                    this.converter.deleteImage(req.body.id, req.body.name);
                    });

        router.post(this.ADD_WAITING_GAME_URL,
                    (req: Request, res: Response, next: NextFunction ) => this.gameDBService.addGameToWaitingRoom(req, res, next));

        router.post(this.DELETE_WAITING_GAME_URL,
                    (req: Request, res: Response, next: NextFunction ) => this.gameDBService.deleteGameFromWaitingRoom(req, res, next));

    // DELETE requests
        router.delete(this.DELETE_GAME_URL,
                      (req: Request, res: Response, next: NextFunction) => this.gameDBService.deleteGame(req, res, next));

        return router;
    }
}
