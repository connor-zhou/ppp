import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { investRouting }         from  './invest.routing';
import { InvestComponent }          from "./invest.component";
import { ProjectDetailComponent } from "./projectDetail.component";
import { OverallComponent } from "./overall.component";
import { ConfirmInvestComponent } from "./confirmInvest.component";
import {InvestResultComponent} from "./result.component";
import {SharedModule} from "../common/shared.module";

@NgModule({
    imports:[
        investRouting,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations:[
        InvestComponent,
        ProjectDetailComponent,
        OverallComponent,
        ConfirmInvestComponent,
        InvestResultComponent
    ],
    bootstrap: [ InvestComponent ]
})
export class InvestModule {

}
   