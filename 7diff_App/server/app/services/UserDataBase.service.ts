import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import * as constants from "../mongoDB/DBconstants";

@injectable()
export class UserDataBase {

    public addUser(req: Request, res: Response): void {
        // tslint:disable-next-line:only-arrow-functions no-any
        constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, function(err: Error, client: any): void {
            // tslint:disable-next-line:no-any
            let db: any = client.db(constants.DB_DB);
            db = db.collection(constants.USERNAME_COLLECTION);
            // tslint:disable-next-line:only-arrow-functions no-empty no-shadowed-variable
            db.find(req.body , {$eq: req.body.body, projection : {_id : 0}}).toArray((error: Error, user: Message[] ) => {
                let message: Message ;
                if (user.length > 0) {
                    if (user[0].body === req.body.body) {
                        message = {title: "alert", body: "Ce nom de joueur est déjà utilisé. SVP en choisir un autre."};
                        res.json(message);
                    }
                } else {
                    message = {title: "alert", body: "successful"};
                    res.json(message);
                    }
            });
            db.updateOne(req.body, {$set : req.body}, {upsert: true});
            client.close();
        });
    }
    public removeUserSocket(user: String): void {
        try {
        // tslint:disable-next-line: no-any
            constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
                // tslint:disable-next-line:no-any
                let db: any = client.db(constants.DB_DB);
                db = db.collection(constants.USERNAME_COLLECTION);
                // tslint:disable-next-line:no-any
                const query: any = { body : user};
                db.deleteOne(query, (error: Error, res: Response) => {
                    if (error) {throw error; }
                });
                client.close();
            });
        } catch (e) {
            return e;
        }
    }
}
