import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';

import { signRouting }         from './sign.routing';

import { SignComponent }            from  './sign.component';
import { LoginComponent }           from  './login.component';
import { RegisterComponent }        from "./register.component";
import { MmmComponent }             from "./mmm.component";
import { FindComponent }            from "./find.component";
import { AgreementComponent }       from "./agreement.component";
import { TermsComponent }           from "./terms.component";
import { MmmSuccessComponent }      from "./success.component";
import { ValidatePhoneComponent }   from "./validatePhone.component";
import {RegisterSuccessComponent}   from "./success.register.component";
import {MmmService}                 from "../../services/Mmm.service";
import {SharedModule} from "../common/shared.module";


@NgModule({
    imports: [
        signRouting,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        SignComponent,
        LoginComponent,
        RegisterComponent,
        MmmComponent,
        FindComponent,
        AgreementComponent,
        TermsComponent,
        MmmSuccessComponent,
        ValidatePhoneComponent,
        RegisterSuccessComponent
    ],
    providers:[
        MmmService
    ],
    bootstrap: [ SignComponent ]
})
export class SignModule {}
