import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';

import { helpRouting }         from  './help.routing';
import {HelpIndexComponent}          from "./index.component";
import {HelpComponent}          from "./help.component";
import {HelpDownloadComponent} from "./download.component";
import {HelpWarningComponent} from "./warning.component";

import {HelpService} from '../../services/Help.service';
import {RiskAssessComponent} from "./riskAssess.component";

@NgModule({
    imports:[
        helpRouting,
        CommonModule
    ],
    declarations:[
        HelpIndexComponent,
        HelpComponent,
        HelpDownloadComponent,
        HelpWarningComponent,
        RiskAssessComponent
    ],
    providers:[
        HelpService
    ],
    bootstrap: [ HelpIndexComponent ]
})
export class HelpModule {

}
   