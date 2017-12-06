import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent }         from  './sign.component';
import { LoginComponent }         from  './login.component';
import { RegisterComponent } from "./register.component";
import { MmmComponent } from "./mmm.component";
import { FindComponent } from "./find.component";
import { AgreementComponent } from "./agreement.component";
import { TermsComponent } from "./terms.component";
import { MmmSuccessComponent } from "./success.component";
import { ValidatePhoneComponent } from "./validatePhone.component";
import {RegisterSuccessComponent} from "./success.register.component";
import {SignGuard} from "../../services/signGuard.service";


export const signRoutes: Routes = [
    {
        path:'',
        component: SignComponent,
        canActivate:[SignGuard],
        children:[
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent,
            },
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'mmm',
                component:MmmComponent
            },
            {
                path:'find',
                component:FindComponent
            },
            {
                path:'agreement',
                component:AgreementComponent
            },
            {
                path:'terms',
                component:TermsComponent
            },
            {
                path:'mmmSuccess',
                component:MmmSuccessComponent
            },
            {
                path:'validatePhone',
                component:ValidatePhoneComponent
            },
            {
                path:'registerSucc',
                component:RegisterSuccessComponent
            }
        ]
    }

];
export const signRouting: ModuleWithProviders = RouterModule.forChild(signRoutes);

