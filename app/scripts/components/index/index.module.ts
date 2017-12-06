import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';

import { indexRouting }         from  './index.routing';
import { IndexComponent }       from './index.component';
import { BusinessComponent }       from './business.component';
import { NoticeComponent }       from './notice.component';
import { SafetyComponent }       from './safety.component';
import { BannerComponent }       from './banner.component';
import { NoviceComponent }       from './novice.component';
import { RecommendComponent }       from './recommend.component';
import { MediaComponent }       from './media.component';
import { IndustryComponent }       from './industry.component';
import { AdComponent }       from './ad.component';
import {NewhandComponent} from "./newhand.component";
import {FewmarkComponent} from "./fewmark.component";
import {ManageMoneyComponent} from "./manageMoney.component";
import {SharedModule} from "../common/shared.module";

@NgModule({
    imports:[
        indexRouting,
        CommonModule,
        SharedModule
    ],
    declarations:[
        IndexComponent,
        NoticeComponent,
        SafetyComponent,
        BusinessComponent,
        BannerComponent,
        NoviceComponent,
        RecommendComponent,
        MediaComponent,
        IndustryComponent,
        AdComponent,
        NewhandComponent,
        FewmarkComponent,
        ManageMoneyComponent
    ],
    bootstrap: [ IndexComponent ]
})
export class IndexModule {

}
