import { NgModule }       from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule }       from '@angular/common';

import { myRouting }         from  './my.routing';
import { MyComponent }          from "./my.component";
import {HeadComponent}   from './head.component';
import {MenuComponent}  from './menu.component';
import { OverviewComponent } from "./overview.component";
import { RechargeComponent } from "./recharge.component";
import { WithdrawComponent } from "./withdraw.component";
import { SSComponent } from "./safetySetting.component";
import { CouponComponent } from "./coupon.component";
import { RewardComponent } from "./reward.component";
import { FundComponent } from "./fund.component";
import { MyInvestComponent } from "./invest.component";
import { MsgCenterComponent } from "./msgCenter.component";
import { SSIndexComponent } from "./index.safetySetting.component";
import { SSSetEmailComponent } from "./setEmail.safetySetting.component";
import { SSModifyPhoneComponent } from "./phone.safetySetting.component";
import { SSModifyEmailComponent } from "./modifyEmail.safetySetting.component";
import { SSModifyLoginPwdComponent } from "./modifyLoginPwd.safetySetting.component";

import {MathFloorPipe} from '../../pipe/math-floor'
import {FractionalPipe} from '../../pipe/fractional'
import {SharedModule} from "../common/shared.module";
import {InputNumberDirective} from "../../directives/inputNumber.directive";
import {PieChartComponent} from "./pieChart.component";
import {AngularEchartsModule} from "ngx-echarts";
import {BankComponent} from "./bank.component";
import {PlatformUrlComponent} from "./platform-url.component";
import {RegisterBfComponent} from "./register-bf.component";
import {SSModifyDealPwdComponent} from "./modify-deal-pwd.component";
import {PersonInfoComponent} from "./person-info.component";



@NgModule({
    imports:[
        myRouting,
        CommonModule,
        FormsModule,
        SharedModule,
        AngularEchartsModule,
    ],
    declarations:[
        MyComponent,
        HeadComponent,
        MenuComponent,
        OverviewComponent,
        FundComponent,
        MyInvestComponent,
        CouponComponent,
        RewardComponent,
        MsgCenterComponent,
        RechargeComponent,
        WithdrawComponent,
        SSComponent,
        SSIndexComponent,
        SSSetEmailComponent,
        SSModifyPhoneComponent,
        SSModifyEmailComponent,
        SSModifyLoginPwdComponent,
        FractionalPipe,
        InputNumberDirective,
        PieChartComponent,
        BankComponent,
        PlatformUrlComponent,
        RegisterBfComponent,

        SSModifyDealPwdComponent,
        PersonInfoComponent


    ],
    bootstrap: [ MyComponent ]
})
export class MyModule {

}
