import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import {PlatformInfoComponent} from "./info.component";


const platformRoutes: Routes = [
    {
        path:'',
        children:[
            {
                path:'',
                redirectTo:'info',
                pathMatch:'full'
            },
            {
                path:'info',
                component:PlatformInfoComponent
            }
        ]
    }
];

export const platformRouting: ModuleWithProviders = RouterModule.forChild(platformRoutes);
