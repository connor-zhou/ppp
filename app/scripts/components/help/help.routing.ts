import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { HelpIndexComponent } from "./index.component";
import { HelpComponent } from "./help.component";
import {HelpDownloadComponent} from "./download.component";
import {HelpWarningComponent} from "./warning.component";
import {RiskAssessComponent} from "./riskAssess.component";
import {AuthGuard} from "../../services/authGuard.service";


const helpRoutes: Routes = [
    {
        path:'',
        component:HelpIndexComponent,
        children:[
            {
                path:'',
                redirectTo:'index',
                pathMatch:'full'
            },
            {
                path:'index',
                component:HelpComponent
            },
            {
                path:'download',
                component:HelpDownloadComponent
            },
            {
                path:'warning',
                component:HelpWarningComponent
            },
            {
                path:'riskAssess',
                component:RiskAssessComponent,
                canActivate:[AuthGuard]
            }
        ]
    }
];

export const helpRouting: ModuleWithProviders = RouterModule.forChild(helpRoutes);
