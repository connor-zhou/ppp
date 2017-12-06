import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }            from '../services/authGuard.service'
import { MobileDetect } from "../services/mobileDetect.service";
import {SignGuard} from "../services/signGuard.service";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren:'es6-promise-loader!../components/index/index.module#IndexModule',
        canLoad:[MobileDetect]
    },
    {
        path:'invest',
        loadChildren:'es6-promise-loader!../components/invest/invest.module#InvestModule'
    },
    {
        path:'my',
        loadChildren:'es6-promise-loader!../components/my/my.module#MyModule',
        canLoad:[AuthGuard]
    },
    {
        path: 'contact',
        loadChildren:'es6-promise-loader!../components/contact/contact.module#ContactModule'
    },
    {
        path:'sign',
        loadChildren:'es6-promise-loader!../components/sign/sign.module#SignModule',
        canLoad:[SignGuard]
    },
    {
        path:'help',
        loadChildren:'es6-promise-loader!../components/help/help.module#HelpModule'
    },
    // {
    //     path:'platform',
    //     loadChildren:'es6-promise-loader!../components/platform/platform.module#PlatformModule'
    // },
    {
        path:'shop',
        loadChildren:'es6-promise-loader!../components/shop/shop.module#ShopModule'
    },
    {
        path:'**',
        redirectTo:'index'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

