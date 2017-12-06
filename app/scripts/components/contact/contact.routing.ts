import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { ContactComponent }        from './contact.component'
import {IntroComponent} from "./intro.component";
import {LatestComponent} from "./latest.component";
import {InsuranceComponent} from "./insurance.component";
import {ContactUsComponent} from "./contactUs.component";
import {IndustryComponent} from "./industry.component";
import {ContactMediaComponent } from "./media.component";
import {ContactPlatformComponent} from "./platform.component";
import {ContactShareholdersComponent} from "./shareholders.component";
import {ArticleComponent} from "./article.component";


const contactRoutes: Routes = [
    {
        path:'',
        component:ContactComponent,
        children:[
            {
                path:'',
                redirectTo:'intro',
                pathMatch:'full'
            },
            {
                path:'intro',
                component:IntroComponent
            },
            {
                path:'latest',
                component:LatestComponent
            },
            {
                path:'insurance',
                component:InsuranceComponent
            },
            {
                path:'media',
                component:ContactMediaComponent
            },
            {
                path:'industry',
                component:IndustryComponent
            },
            {
                path:'us',
                component:ContactUsComponent
            },
            {
                path:'platform',
                component:ContactPlatformComponent
            },
            {
                path:'shareholders',
                component:ContactShareholdersComponent
            },
            {
                path:'article/:type/:id',
                component:ArticleComponent
            }
        ]
    }
];

export const contactRouting: ModuleWithProviders = RouterModule.forChild(contactRoutes);
