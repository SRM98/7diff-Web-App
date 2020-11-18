import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "hammerjs";
import {BootStrapError} from "../../common/error";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  // tslint:disable-next-line:no-console from cli
  .catch((err: BootStrapError) => console.log(err));