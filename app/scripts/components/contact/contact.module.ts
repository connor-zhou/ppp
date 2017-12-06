import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';

import {SharedModule} from "../common/shared.module";
import { contactRouting }         from  './contact.routing';
import { ContactComponent }       from './contact.component';
import {IntroComponent} from "./intro.component";
import {IndustryComponent} from "./industry.component";
import {LatestComponent} from "./latest.component";
import {InsuranceComponent} from "./insurance.component";
import {ContactMediaComponent} from "./media.component";
import {ContactUsComponent} from "./contactUs.component";
import {ContactPlatformComponent} from "./platform.component";
import {ContactShareholdersComponent} from "./shareholders.component";
import {ArticleComponent} from "./article.component";

@NgModule({
    imports:[
        contactRouting,
        CommonModule,
        SharedModule
    ],
    declarations:[
        ContactComponent,
        IntroComponent,
        IndustryComponent,
        LatestComponent,
        InsuranceComponent,
        ContactMediaComponent,
        ContactUsComponent,
        ContactPlatformComponent,
        ContactShareholdersComponent,
        ArticleComponent
    ],
    bootstrap: [ ContactComponent ]
})
export class ContactModule {

}
