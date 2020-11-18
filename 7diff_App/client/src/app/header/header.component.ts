import { Component } from "@angular/core";
import {UsernameService} from "../username.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})

export class HeaderComponent {
  public username: string;

  public constructor(public user: UsernameService) {
    this.username = user.getUsername();
  }
}
