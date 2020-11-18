import { NextFunction } from "connect";
import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { ImageService } from "../services/image.service";
import { ImageControlService } from "../services/imageControl.service";
import Types from "../types";

interface GameInfos {
    name: string;
    arrayPixel: string[][];
    arrayOriginal: string[][];
    arrayModified: string[][];
    nbDiffs: number;

}

@injectable()
export class ImageController {

    private multer: multer.Instance;
    public readonly FILE_SIZE: number = 921654;
    public readonly SUBSTR_VALUE: number = 22;
    public bufferModified: Buffer;
    public  arrayGames: GameInfos[];
    public constructor( @inject(Types.ImageService) private imageService: ImageService,
                        @inject(Types.ImageControlService) private imageControl: ImageControlService,

                      ) {
                          this.arrayGames = [];
                          this.multer = multer();
    }

    public get router(): Router {
        const router: Router = Router();

        router.post("/image", this.multer.fields([{name: "originalImage", maxCount: 10},
                                                  {name: "modifiedImage", maxCount: 10},
                                                  {name: "id", maxCount: 10}]),
                    async (req: Request, res: Response) => {

                    if (this.verifiedFile(req)) {
                        try {
                            this.imageService.readFile(req.files["originalImage"][0].buffer, req.files["modifiedImage"][0].buffer);
                            res.json(this.imageService.nbDifferences);
                            } catch (error) { res.json("Erreur avec le fichier : " + error.message);  }
                    } else {
                         res.json("Erreur avec le fichier : mauvais type.");
           }
        });

        router.post("/newGame", (req: Request, res: Response, next: NextFunction) => {
            this.imageControl.newGame(req);
            res.json("newGame");

        });
        router.post("/deleteGame", async(req: Request, res: Response, next: NextFunction) => {
            this.imageControl.deleteGame(req);
            res.json("deleted");
        });

        router.post("/difference", async(req: Request, res: Response) => {
            this.imageControl.findDifference(req, res);
            });

        router.get("/modifiedGameImg", async(req: Request, res: Response) => {
            this.imageControl.getImg(req, res);

        });

        return router;
    }

    private fileVerification(req: Request, name: string): boolean {

        return req.files[name][0].mimetype === "image/bmp" &&
        req.files[name][0].size === this.FILE_SIZE;

    }

    private verifiedFile(req: Request): boolean {
        return (this.fileVerification(req, "originalImage") || this.fileVerification(req, "modifiedImage"));
    }

}
