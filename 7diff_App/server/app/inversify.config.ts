import { Container } from "inversify";
import { Application } from "./app";
import { GameDBController } from "./controllers/gameDB.controller";
import { HighScoreController } from "./controllers/highscore.controller";
import {ImageController} from "./controllers/image.controller";
import { InitialViewController } from "./controllers/initialView.controller";
import { SoundController } from "./controllers/sound.controller";
import { Server } from "./server";
import { FreeDiffService } from "./services/FreeGameDiff.service";
import {UserDataBase} from "./services/UserDataBase.service";
import { DifferencesService } from "./services/differences.service";
import { GameDBService } from "./services/gameDB.service";
import { HighscoreService } from "./services/highscore.service";
import {ImageService} from "./services/image.service";
import { ImageControlService } from "./services/imageControl.service";
import { SoundService } from "./services/sound.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.IndexController).to(InitialViewController);

container.bind(Types.GameDBController).to(GameDBController);
container.bind(Types.GameDBService).to(GameDBService);

container.bind(Types.HighscoreController).to(HighScoreController);
container.bind(Types.HighscoreService).to(HighscoreService);

container.bind(Types.FreeDiffService).to(FreeDiffService);
container.bind(Types.ImageController).to(ImageController);
container.bind(Types.ImageService).to(ImageService);
container.bind(Types.DifferencesService).to(DifferencesService);
container.bind(Types.SoundService).to(SoundService);
container.bind(Types.SoundController).to(SoundController);
container.bind(Types.ImageControlService).to(ImageControlService);

container.bind(Types.UserDataBase).to(UserDataBase);

export { container };
