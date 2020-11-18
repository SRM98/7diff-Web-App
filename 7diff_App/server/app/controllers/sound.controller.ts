import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SoundService } from "../services/sound.service";
import Types from "../types";

@injectable()
export class SoundController {

    public isSoundCorrect: boolean;

    public constructor(@inject(Types.SoundService) private soundService: SoundService) {}

    public get router(): Router {
        const router: Router = Router();

        router.get("/soundCorrect", async(req: Request, res: Response) => {

            this.isSoundCorrect = true;

            const reponse: string = this.soundService.sound(this.isSoundCorrect);
            res.json(reponse);

        });
        router.get("/soundIncorrect", async(req: Request, res: Response) => {

            this.isSoundCorrect = false;
            const reponse: string = this.soundService.sound(this.isSoundCorrect);
            res.json(reponse);

        });

        return router;
    }

}
