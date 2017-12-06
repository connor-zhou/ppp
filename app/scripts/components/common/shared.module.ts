import { NgModule }       from '@angular/core';
import { CommonModule }       from '@angular/common';
import {BaiduMap} from 'angular2-baidu-map';

import {PagerPrevNextComponent} from "./pagerPrevNext.component";
import {ShareComponent} from "./share.component";
import {Map} from "./baiduMap.component";
import {PagerComponent} from "./pager.component";
import {DatePickComponent} from "./datePick.component";
import {TipComponent} from "./tip.component";
import {MathFloorPipe} from "../../pipe/math-floor";
import {MarqueeComponent} from "./marquee.component";
import {CarouselMultipleComponent} from "./carouselMultiple.component";
import {MaskComponent} from "./mask.component";
import {LoadingDirective} from "../../directives/Loading.directive";

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        DatePickComponent,
        PagerPrevNextComponent,
        PagerComponent,
        ShareComponent,
        BaiduMap,
        Map,
        TipComponent,
        MathFloorPipe,
        MarqueeComponent,
        CarouselMultipleComponent,
        MaskComponent,
        LoadingDirective
    ],
    exports:[
        DatePickComponent,
        PagerPrevNextComponent,
        PagerComponent,
        ShareComponent,
        Map,
        TipComponent,
        MathFloorPipe,
        MarqueeComponent,
        CarouselMultipleComponent,
        MaskComponent,
        LoadingDirective
    ]
})
export class SharedModule {

}
