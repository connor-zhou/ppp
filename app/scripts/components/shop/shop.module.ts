import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';

import {shopRouting}         from './shop.routing';

import { ShopComponent }            from  './shop.component';
import {SharedModule} from "../common/shared.module";
import {StarHomeComponent} from "./star-home.component";
import {StarDetailComponent} from "./star-detail.component";
import {CouponDetailComponent} from "./coupon-detail.component";
import {SuccessComponent} from "./success.component";



@NgModule({
    imports: [
        shopRouting,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ShopComponent,
        StarHomeComponent,
        StarDetailComponent,
        CouponDetailComponent,
        SuccessComponent
    ],
    providers:[
    ],
    bootstrap: [ ShopComponent ]
})
export class ShopModule {}
