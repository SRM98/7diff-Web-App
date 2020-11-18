import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent} from "./admin/admin.component";
import {FreeGameViewComponent} from "./free-game-view/free-game-view.component";
import { GameViewComponent} from "./game-view/game-view.component";
import { GamesComponent} from "./games/games.component";
import { InitialViewComponent} from "./initial-view/initial-view.component";

const routes: Routes = [
  { path: "", redirectTo: "/initialView", pathMatch: "full" },
  { path: "listOfGames", component: GamesComponent },
  { path: "initialView", component: InitialViewComponent },
  { path: "admin", component: AdminComponent },
  { path: "simpleGame/:id/:type/:username", component: GameViewComponent},
  { path: "freeGame/:id/:type/:username", component: FreeGameViewComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule {
}
