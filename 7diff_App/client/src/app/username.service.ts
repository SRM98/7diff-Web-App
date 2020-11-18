import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../../../common/communication/message";
import * as constants from "../../../common/constants";
import {UsernameError} from "../../../common/error";

@Injectable()
export class UsernameService {

    private readonly BASE_URL_SEND_USER_NAME: string = "http://" + constants.SERVER_IP + ":3000/api/index/sendUserName";
    private readonly BASE_URL_DELETE_NAME: string = "http://" + constants.SERVER_IP + ":3000/api/index/deleteUserName";
    private username: string;

    public constructor(private http: HttpClient) {
      this.username = "";
    }

    public getUsername(): string {
      return this.username;
    }

    public setUsername(username: string): void {
      this.username = username;
    }

    public async postUserName(user: Message): Promise<Message> {
      return this.http.post<Message>(this.BASE_URL_SEND_USER_NAME, user).pipe(
          catchError(this.handleError<Message>("postUserName")),
      ).toPromise();
    }

    public async removeUserName(user: Message): Promise<Message> {
      return this.http.post<Message>(this.BASE_URL_DELETE_NAME, user).pipe(
        catchError(this.handleError<Message>("removeUserName")),
      ).toPromise();
    }

    private handleError<T>(request: string, result?: T): (error: UsernameError) => Observable<T> {

        return (error: UsernameError): Observable<T> => {
            return of(result as T);
        };
    }
}
