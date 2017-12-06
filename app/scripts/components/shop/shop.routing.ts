import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopComponent}         from  './shop.component';
import {StarHomeComponent} from "./star-home.component";
import {StarDetailComponent} from "./star-detail.component";
import {CouponDetailComponent} from "./coupon-detail.component";
import {SuccessComponent} from "./success.component";
import {AuthGuard} from "../../services/authGuard.service";


export const shopRoutes: Routes = [
    {
        path:'',
        component: ShopComponent,

        children:[
            {
                path:'',
                redirectTo:'starhome',
                pathMatch:'full'
            },
            {
                path:'starhome',
                component:StarHomeComponent,


            },
            {
                path:'detail/:type',
                component:StarDetailComponent,
                canActivate:[AuthGuard],
            },
            {
                path:'coupon/:id',
                component:CouponDetailComponent,
                canActivate:[AuthGuard],
            },
            {
                path:'success',
                component:SuccessComponent,
                canActivate:[AuthGuard],
            }
        ]
    }

];
export const shopRouting: ModuleWithProviders = RouterModule.forChild(shopRoutes);

