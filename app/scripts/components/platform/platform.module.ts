import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';

import {SharedModule} from "../common/shared.module";
import { platformRouting }         from  './platform.routing';
import {PlatformInfoComponent} from "./info.component";


@NgModule({
    imports:[
        platformRouting,
        CommonModule,
        SharedModule
    ],
    declarations:[
        PlatformInfoComponent
    ],
    bootstrap: [ PlatformInfoComponent ]
})
export class PlatformModule {

}
