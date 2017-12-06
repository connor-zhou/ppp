/**
 * Created by LeiLiang on 2016/8/29.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';
import '../../css/app-base.css';

//noinspection TypeScriptUnresolvedVariable
if (process.env.appConfig.enableProdMode ) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
