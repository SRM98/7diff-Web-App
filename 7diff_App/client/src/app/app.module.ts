import {OverlayModule} from "@angular/cdk/overlay";
import { HttpClientModule } from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
  MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatToolbarModule} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {ChatService} from "./chat.service";
import { FreeGameViewComponent } from "./free-game-view/free-game-view.component";
import { FreeViewComponent } from "./free-view/free-view.component";
import { GameDetailComponent } from "./game-detail/game-detail.component";
import { GameViewComponent } from "./game-view/game-view.component";
import {GameService} from "./game.service";
import { GamesComponent } from "./games/games.component";
import { HeaderComponent } from "./header/header.component";
import { IndexService } from "./index.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { SimpleViewComponent } from "./simple-view/simple-view.component";
import { AnimalsCreatorService } from "./threeJS/animalsCreator.service";
import { CheatModeService } from "./threeJS/cheat-mode.service";
import {CollisionService} from "./threeJS/collision.service";
import { DifferenceFinderService } from "./threeJS/difference-finder.service";
import { ObjectsCreatorService } from "./threeJS/objectsCreator.service";
import { RenderService } from "./threeJS/render.service";
import { SceneCreatorService } from "./threeJS/sceneCreator.service";
import { ThreeDifferenceService } from "./threeJS/three-difference.service";
import {UsernameService} from "./username.service";
import {WebSocketService} from "./webSocket.service";

@NgModule({
  declarations: [
    AppComponent,
    SimpleViewComponent,
    FreeViewComponent,
    AppComponent,
    GamesComponent,
    InitialViewComponent,
    GameDetailComponent,
    AdminComponent,
    HeaderComponent,
    GameViewComponent,
    FreeGameViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OverlayModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  exports : [
  ],
  providers: [
    UsernameService,
    IndexService,
    GameService,
    RenderService,
    ObjectsCreatorService,
    AnimalsCreatorService,
    SceneCreatorService,
    ThreeDifferenceService,
    DifferenceFinderService,
    CheatModeService,
    ChatService,
    WebSocketService,
    CollisionService,
  ],
  entryComponents: [SimpleViewComponent, FreeViewComponent, AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
