import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { HighscoreService } from "../services/highscore.service";
import Types from "../types";

@injectable()
export class HighScoreController {

    private readonly SORT_SCORES_URL: string = "/sort";
    private readonly GET_POSITION: string = "/getPosition";

    public constructor(@inject(Types.HighscoreService) private highscoreService: HighscoreService) { }
    public get router(): Router {
        const router: Router = Router();

        router.put(this.SORT_SCORES_URL,
                   (req: Request, res: Response, next: NextFunction) => {
                        res.send(this.highscoreService.sortScores(req.body));
                   });

        router.put(this.GET_POSITION,
                   (req: Request, res: Response, next: NextFunction) => {
                            res.send(this.highscoreService.getNewScorePosition(req.body).toString());
                        });

        return router;
    }
}
