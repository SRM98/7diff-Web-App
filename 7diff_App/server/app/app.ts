import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { GameDBController } from "./controllers/gameDB.controller";
import { HighScoreController } from "./controllers/highscore.controller";
import {ImageController} from "./controllers/image.controller";
import { InitialViewController } from "./controllers/initialView.controller";
import { SoundController } from "./controllers/sound.controller";
import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.IndexController) private indexController: InitialViewController,
                       @inject(Types.ImageController) private imageController: ImageController,
                       @inject(Types.GameDBController) private gameDBController: GameDBController,
                       @inject(Types.SoundController) private soundController: SoundController,
                       @inject(Types.HighscoreController) private highscoreController: HighScoreController) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({limit: "50mb"}));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use("/api/gameDB", this.gameDBController.router);
        this.app.use("/api/index", this.indexController.router);
        this.app.use("/api/image", this.imageController.router);
        this.app.use("/api/sound", this.soundController.router);
        this.app.use("/api/hs", this.highscoreController.router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
