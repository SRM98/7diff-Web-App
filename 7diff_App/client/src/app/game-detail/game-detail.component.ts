import {Component, Input} from "@angular/core";
import {Game} from "../../../../common/communication/game";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.css"],
})
export class GameDetailComponent {

  @Input() public game: Game;

}
