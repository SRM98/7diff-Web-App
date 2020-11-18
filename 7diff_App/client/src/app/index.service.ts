import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { FreeGame, Game, SimpleGame, WaitingGame } from "../../../common/communication/game";
import { Score } from "../../../common/communication/score";
import { SERVER_IP } from "../../../common/constants";

@Injectable()
export class IndexService {

    private readonly LISTOFGAMES_URL:           string = "http://" +  SERVER_IP + ":3000/api/gameDB/listOfGames";
    private readonly LISTOFGAMES_MODIFY_URL:    string = "http://" +  SERVER_IP + ":3000/api/gameDB/listOfGames/modify";
    private readonly DETAIL_URL:                string = "http://" +  SERVER_IP + ":3000/api/gameDB/detail/";
    private readonly FREE_GAME_DETAIL_URL:      string = "http://" +  SERVER_IP + ":3000/api/gameDB/freeGameDetail/";
    private readonly WAITING_GAME_DETAIL_URL:   string = "http://" +  SERVER_IP + ":3000/api/gameDB/waitingGameDetail/";
    private readonly RESET_HS_URL:              string = "http://" +  SERVER_IP + ":3000/api/gameDB/reseths/";
    private readonly DELETE_GAME_URL:           string = "http://" +  SERVER_IP + ":3000/api/gameDB/deleteGame/";
    private readonly ADD_FREE_GAME_URL:         string = "http://" +  SERVER_IP + ":3000/api/gameDB/addFreeGame";
    private readonly ADD_WAITING_GAME_URL:      string = "http://" +  SERVER_IP + ":3000/api/gameDB/addWaitingGame/";
    private readonly DELETE_WAITING_GAME_URL:   string = "http://" +  SERVER_IP + ":3000/api/gameDB/deleteWaitingGame/";
    private readonly NEW_GAME_URL:              string = "http://" +  SERVER_IP + ":3000/api/image/newGame";
    private readonly WAITING_ROOM_URL:          string = "http://" +  SERVER_IP + ":3000/api/gameDB/getWaitingRoom/";
    private readonly SORT_SCORES_URL:           string = "http://" +  SERVER_IP + ":3000/api/hs/sort";
    private readonly GET_POSITION:              string = "http://" +  SERVER_IP + ":3000/api/hs/getPosition";

    public constructor(private http: HttpClient) { }

    public getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.LISTOFGAMES_URL);
    }

    public getSimpleGame(id: number): Observable<SimpleGame> {
        return this.http.get<SimpleGame>(this.DETAIL_URL + id);
    }

    public getFreeGame(id: number): Observable<FreeGame> {
        return this.http.get<FreeGame>(this.FREE_GAME_DETAIL_URL + id);
    }

    public getWaitingGame(id: number): Observable<WaitingGame> {
        return this.http.get<WaitingGame>(this.WAITING_GAME_DETAIL_URL + id);
    }

    public getWaitingRoom(): Observable<WaitingGame[]> {
        return this.http.get<WaitingGame[]>(this.WAITING_ROOM_URL);
    }

    // PUT requests
    public updateHighScores(game: Game): Observable<Game> {
        return this.http.put<Game>(this.RESET_HS_URL + game.id, game);
    }

    public sortScores(scores: Score[]): Observable<Score[]> {
        return this.http.put<Score[]>(this.SORT_SCORES_URL, scores);
    }

    public getNewScorePosition(scores: Score[]): Observable<string> {
        return this.http.put<string>(this.GET_POSITION, scores);
    }

    // POST requests
    public addSimpleGame (game: Game): Observable<Game[]> {
        return this.http.post<Game[]>(this.LISTOFGAMES_URL, game);
    }
    public modifyGame(game: Game): Observable<Game[]> {
        return this.http.post<Game[]>(this.LISTOFGAMES_MODIFY_URL, game);
    }
    public deleteImg(game: Game): Observable<Game[]> {
        return this.http.post<Game[]>(this.DELETE_GAME_URL + "image", game);
    }

    public addFreeGame (game: Game): Observable<Game[]> {
        return this.http.post<Game[]>(this.ADD_FREE_GAME_URL, game);
    }

    public addWaitingGame (game: WaitingGame): Observable<WaitingGame> {
        return this.http.post<WaitingGame>(this.ADD_WAITING_GAME_URL + game.id, game);
    }

    public deleteWaitingGame (game: WaitingGame): Observable<WaitingGame> {
        return this.http.post<WaitingGame>(this.DELETE_WAITING_GAME_URL + game.id, game);
    }

    public addNewGame(message: string): void {
        this.http.post(this.NEW_GAME_URL, {value: message}).subscribe();
    }
    // DELETE requests
    public deleteGame(game: Game): Observable<Game[]> {
        return this.http.delete<Game[]>(this.DELETE_GAME_URL + game.id);
    }

    public handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
