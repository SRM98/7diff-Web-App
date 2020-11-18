import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Message} from "../../../../common/communication/message";
import {ChatService} from "../chat.service";
import {UsernameService} from "../username.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {

  private readonly REGEX_USERNAME: string = "^[a-zA-Z0-9]{2,16}$";
  private readonly LOGO_URL: string = require("./assets/logo2.png");

  public imgSrc: string;
  public nameForm: FormGroup;

  public constructor(private fb: FormBuilder, private service: UsernameService, private router: Router,
                     private chat: ChatService) {
    if (service.getUsername() !== "") {
      this.chat.disconnect();
    }
  }

  public ngOnInit(): void {
    this.nameForm = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.pattern(this.REGEX_USERNAME)]],
    });
    this.imgSrc = this.LOGO_URL;
  }

  public onSubmitName(): void {
    const message: Message = {title: "userName", body: this.nameForm.controls["name"].value};
    this.service.postUserName(message).then((mess: Message) => {
      if (mess.body === "successful") {
        this.service.setUsername(message.body);
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(["/listOfGames"]);
        this.chat.connect();
        this.chat.sendUserName(this.nameForm.controls["name"].value);
      } else {
        alert(mess.body);
      }
    }).catch(() => {
      alert("unsuccessful");

    });
  }
}
