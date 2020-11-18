import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import {UserDataBase} from "../services/UserDataBase.service";
import Types from "../types";

@injectable()
export class InitialViewController {

    private readonly SEND_URL: string = "/sendUserName";

    public constructor(@inject(Types.UserDataBase) private userService: UserDataBase) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(this.SEND_URL, (req: Request, res: Response) => {
            this.userService.addUser(req, res);
        });

        return router;
    }
}
