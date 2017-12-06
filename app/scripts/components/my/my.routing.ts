import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { MyComponent } from "./my.component";
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
import {SSModifyEmailComponent} from "./modifyEmail.safetySetting.component";
import {SSModifyPhoneComponent} from "./phone.safetySetting.component";
import {SSModifyLoginPwdComponent} from "./modifyLoginPwd.safetySetting.component";
import {SSSetEmailComponent} from "./setEmail.safetySetting.component";
import {BankComponent} from "./bank.component";
import {AuthGuard} from "../../services/authGuard.service";
import {PlatformUrlComponent} from "./platform-url.component";
import {RegisterBfComponent} from "./register-bf.component";
import {SSModifyDealPwdComponent} from "./modify-deal-pwd.component";
import {PersonInfoComponent} from "./person-info.component";




const myRoutes: Routes = [
    {
        path:'',
        component:MyComponent,
        canActivate:[AuthGuard],
        children:[
            {
                path:'',
                redirectTo:'overview',
                pathMatch:'full'
            },
            {
                path:'overview',
                component:OverviewComponent
            },
            {
                path:'fund',
                component:FundComponent
            },
            {
                path:'invest',
                component:MyInvestComponent
            },
            {
                path:'recharge',
                component:RechargeComponent
            },
            {
                path:'recharge/:money',
                component:RechargeComponent
            },
            {
                path:'recharge/:money/:successUrl',
                component:RechargeComponent
            },
            {
                path:'withdraw',
                component:WithdrawComponent
            },
            {
                path:'safetySetting',
                component:SSComponent,
                children:[
                    {
                        path:'',
                        redirectTo:'username',
                        pathMatch:'full'
                    },
                    {
                        path:'username',
                        component:SSIndexComponent
                    },
                    {
                        path:'modifyPhone',
                        component:SSModifyPhoneComponent
                    },
                    {
                        path:'modifyEmail',
                        component:SSModifyEmailComponent
                    },
                    {
                        path:'loginPwd',
                        component:SSModifyLoginPwdComponent
                    },
                    {
                        path:'setEmail',
                        component:SSSetEmailComponent
                    },
                    {
                        path:'dealPwd',
                        component:SSModifyDealPwdComponent
                    }
                ]
            },
            {
                path:'coupon',
                component:CouponComponent
            },
            {
                path:'reward',
                component:RewardComponent
            },
            {
                path:'msgCenter',
                component:MsgCenterComponent
            },
            {
                path:'bank',
                component:BankComponent
            },
            {
                path:'platform',
                component:PlatformUrlComponent
            },
            {
                path:'registerBf',
                component:RegisterBfComponent
            },
            {
                path:'person',
                component:PersonInfoComponent
            }
        ]
    }
];

export const myRouting: ModuleWithProviders = RouterModule.forChild(myRoutes);
