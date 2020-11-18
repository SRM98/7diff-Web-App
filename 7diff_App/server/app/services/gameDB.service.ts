import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { FreeGame, Game, SimpleGame, WaitingGame } from "../../../common/communication/game";
import {Converter} from "../converter";
import * as constants from "../mongoDB/DBconstants";
import { waitingRoom } from "../waiting-room";

@injectable()
export class GameDBService {
    private converter: Converter;

    public constructor() {
        this.converter = new Converter();
    }

    public getGames(req: Request, res: Response, next: NextFunction): void {
    // tslint:disable-next-line:no-any
    constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
        if (err) {
           alert("Mauvaise connexion à la base de données");
        } else {
             // tslint:disable-next-line:no-any
             let db: any = client.db(constants.DB_DB);
             db = db.collection(constants.GAMES_COLLECTION);
             db.find({}, {projection : {_id : 0}}).toArray((error: Error, games: Game[]) => {
                 if (error) {
                     alert("Mauvaise connexion à la base de données");
                 } else {
                     this.converter.convertThumbnailsToBase64(games);
                     res.send(JSON.stringify(games));
                 }
             });
             client.close();
        }
    });
    }

    public getSimpleGame(req: Request, res: Response, next: NextFunction): void {
        // tslint:disable-next-line: no-any
        constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
            if (err) {
             alert("Mauvaise connexion à la base de données");
            } else {
                // tslint:disable-next-line:no-any
                let db: any = client.db(constants.DB_DB);
                db = db.collection(constants.GAMES_COLLECTION);
                // tslint:disable-next-line:no-shadowed-variable
                db.find({id: Number(req.params.id)}, {projection : {_id : 0}}).toArray((err: Error, games: SimpleGame[]) => {
                    if (err) {
                        alert("Mauvaise connexion à la base de données");
                    } else {
                        if (games[0] !== undefined) {
                            this.converter.convertSimpleGameToBase64(games[0]);
                            res.send(JSON.stringify(games[0]));
                        } else {
                            res.json("not found");
                        }
                    }
               });
            }
            client.close();
   });
   }

    public getFreeGame(req: Request, res: Response, next: NextFunction): void {
        // tslint:disable-next-line:no-any
        constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
            if (err) {
                alert("Mauvaise connexion à la base de données");
            } else {

                // tslint:disable-next-line:no-any
                let db: any = client.db(constants.DB_DB);
                db = db.collection(constants.GAMES_COLLECTION);
                db.find({id: Number(req.params.id)}, {projection : {_id : 0}}).toArray((error: Error, games: FreeGame[]) => {
                    if (error) {
                        alert("Mauvaise connexion à la base de données");
                    } else {
                        if (games[0] !== undefined) {
                            res.send(JSON.stringify(games[0]));
                        } else {
                            res.json("not found");
                        }
                    }
                });
                client.close();
            }
        });
    }

    // tslint:disable:max-func-body-length
    public updateHighScores(req: Request, res: Response, next: NextFunction): void {
        try {
            // tslint:disable-next-line:no-any
            constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
                if (err) {
                    alert(err);
                } else {
                    // tslint:disable-next-line:no-any
                    let db: any = client.db(constants.DB_DB);
                    db = db.collection(constants.GAMES_COLLECTION);
                    // tslint:only-arrow-functions
                    db.updateOne(
                        {id: Number(req.params.id)},
                        {$set : {hsSolo: req.body.hsSolo, hs1VS1: req.body.hs1VS1}},
                        // tslint:disable-next-line:no-shadowed-variable
                        (err: Error, res: Response) => {
                        if (err) { alert(err); }
                    },
                    );
                    // tslint:disable-next-line:no-shadowed-variable
                    db.find({id: Number(req.params.id)}, {projection : {_id : 0}}).toArray((err: Error, games: Game) => {
                        if (!err) {
                            if (games[0] !== undefined) {
                                this.converter.convertThumbnailToBase64(games[0]);
                                res.send(JSON.stringify(games[0]));
                            } else {
                                res.json("not found");
                                throw err;
                            }
                        }
                    });
                }
                client.close();
            });
        } catch (e) { return e; }
}

    public addSimpleGame(req: Request, res: Response, next: NextFunction): void {
            try {
                this.converter.convertSimpleGameFromBase64(req.body);
                // tslint:disable-next-line:no-any
                constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
                    // tslint:disable-next-line:no-any
                    let db: any = client.db(constants.DB_DB);
                    db = db.collection(constants.GAMES_COLLECTION);
                    // tslint:disable-next-line:only-arrow-functions no-empty no-shadowed-variable
                    db.insertOne(req.body, (error: Error, res: Response) => {
                        if (error) { throw error; }
                    });
                    // tslint:disable-next-line:no-shadowed-variable
                    db.find({}, {projection : {_id : 0}}).toArray((err: Error, games: Game[]) => {
                        this.converter.convertThumbnailsToBase64(games);
                        res.send(JSON.stringify(games));
                        if (err) { throw err; }
                    });
                    client.close();
                });
            } catch (e) { return e; }
    }

    public addFreeGame(req: Request, res: Response, next: NextFunction): void {
        try {
            this.converter.convertFreeGameFromBase64(req.body);
            // tslint:disable-next-line:no-any
            constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
                // tslint:disable-next-line:no-any
                let db: any = client.db(constants.DB_DB);
                db = db.collection(constants.GAMES_COLLECTION);

                // tslint:disable-next-line:only-arrow-functions no-empty no-shadowed-variable
                db.insertOne(req.body, function(error: Error, res: Response): void {
                    if (error) { throw error; }
                });
                // tslint:disable-next-line:no-shadowed-variable
                db.find({}, {projection : {_id : 0}}).toArray((err: Error, games: Game[]) => {
                this.converter.convertThumbnailsToBase64(games);
                res.send(JSON.stringify(games));
                if (err) { throw err; }
                });
                client.close();
            });
        } catch (e) { return e; }
    }

    public deleteGame(req: Request, res: Response, next: NextFunction): void {
        try {
            // tslint:disable-next-line: no-any
            constants.MongoClient.connect(constants.DB_URL, {useNewUrlParser : true}, (err: Error, client: any) => {
            // tslint:disable-next-line:no-any
            let db: any = client.db(constants.DB_DB);
            db = db.collection(constants.GAMES_COLLECTION);
            // tslint:disable-next-line: no-shadowed-variable
            db.deleteOne({id: Number(req.params.id)}, (err: Error, res: Response) => {
                if (err) { throw err; }
            });
            // tslint:disable-next-line:no-shadowed-variable
            db.find({}, {projection : {_id : 0}}).toArray((err: Error, games: Game[]) => {
                this.converter.convertThumbnailsToBase64(games);
                res.send(JSON.stringify(games));
            });

            client.close();
            });
        } catch (e) { return e; }
    }

    public addGameToWaitingRoom(req: Request, res: Response, next: NextFunction): void {
        waitingRoom.push(req.body);
        res.send(req.body);
    }

    public deleteGameFromWaitingRoom(req: Request, res: Response, next: NextFunction): void {
        waitingRoom.splice(waitingRoom.indexOf(req.body), 1);
        res.send(req.body);
    }

    public getWaitingGame(req: Request, res: Response, next: NextFunction): void {
        res.send(this.findWaitingGame(Number(req.params.id)));
    }

    public getWaitingRoom(req: Request, res: Response, next: NextFunction): void {
        res.send(waitingRoom);
    }

    public findWaitingGame(id: number): WaitingGame {
        for (const game of waitingRoom) {
            if (game.id === id) {
                return game;
            }
        }

        return {id: 0, roomname: ""} as WaitingGame;
    }

}
