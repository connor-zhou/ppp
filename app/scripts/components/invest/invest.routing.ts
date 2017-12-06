import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { InvestComponent } from "./invest.component";
import { OverallComponent } from "./overall.component";
import { ConfirmInvestComponent } from "./confirmInvest.component";
import { ProjectDetailComponent } from "./projectDetail.component";
import {InvestResultComponent} from "./result.component";
import {AuthGuard} from "../../services/authGuard.service";


const investRoutes: Routes = [
    {
        path:'',
        component:InvestComponent,
        children:[
            {
                path:'',
                redirectTo:'overall',
                pathMatch:'full'
            },
            {
                path:'overall',
                component:OverallComponent
            },
            {
                path:'confirm/:id/:money',
                component:ConfirmInvestComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'detail/:id',
                component:ProjectDetailComponent
            },
            {
                path:'result/:id',
                component:InvestResultComponent
            }
        ]
    }
];

export const investRouting: ModuleWithProviders = RouterModule.forChild(investRoutes);
