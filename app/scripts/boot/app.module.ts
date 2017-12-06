import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { routing }              from  './app.routing';

import { AppComponent }         from './app.component';
import { HeaderComponent }      from  '../components/common/header.component';
import { FooterComponent }      from  '../components/common/footer.component';

import { AuthGuard }            from "../services/authGuard.service";
import { Config }               from "../services/Config.service";
import { CustomHttp }           from  '../services/customHttp.service';
import { AccountService }           from  '../services/Account.service';
import { LocalStrorageService }           from  '../services/LocalStrorageService.service';
import {CommonService} from "../services/Common.service";
import {TransactionRecordService} from "../services/transactionRecord.service";
import {InvestRecordService} from "../services/investRecord.service";
import {GlobalEventsManager} from "../services/GlobalEventManager.service";
import {MessageService} from "../services/Message.service";
import {EventService} from "../services/Event.service";
import {MmmService} from "../services/Mmm.service";
import {ProjectService} from "../services/Project.service";
import {SubFooterComponent} from "../components/common/footer.sub.component";
import {SubHeaderComponent} from "../components/common/header.sub.component";
import {Base64} from "../services/Base64.service";
import {AppModalComponent} from "../components/common/modal.component";
import {FloatBoxComponent} from "../components/common/floatBox.component";
import {UAService} from "../services/UA.service";
import {MobileDetect} from "../services/mobileDetect.service";
import {SignGuard} from "../services/signGuard.service";
import {BfService} from "../services/Bf.service";
import {TipService} from "../services/Tip.service";
import {SharedModule} from "../components/common/shared.module";
import {ActivateComponent} from "../components/common/activate.component";
import {PlatformService} from "../services/Platform.server";
import {MaskService} from "../services/Mask.service";
import {LoadingService} from "../services/Loading.service";
import {ShopService} from "../services/Shop.service";




@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SubFooterComponent,
        SubHeaderComponent,
        AppModalComponent,
        FloatBoxComponent,
        ActivateComponent
    ],
    providers:[
        AuthGuard,
        SignGuard,
        MobileDetect,
        Config,
        CustomHttp,
        AccountService,
        LocalStrorageService,
        CommonService,
        TransactionRecordService,
        InvestRecordService,
        GlobalEventsManager,
        ProjectService,
        MessageService,
        EventService,
        MmmService,
        Base64,
        UAService,
        BfService,
        TipService,
        PlatformService,
        MaskService,
        LoadingService,
        ShopService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
