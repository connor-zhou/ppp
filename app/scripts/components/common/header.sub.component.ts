/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,Input } from '@angular/core';
import {Config} from "../../services/Config.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";


@Component({
    selector:'xtz-sub-header',
    templateUrl: '../../views/common/header.sub.component.html',
    styles:[require('../../views/common/header.sub.component.less')]
})
export class SubHeaderComponent {

    hideSubNavbar:boolean = true;

    showSubNavbarTip:any = false;
    constructor(
       private Config:Config,
       private globalEventsManager:GlobalEventsManager
    ){

        globalEventsManager.goSignToken.subscribe((val:any) =>{
            this.showSubNavbarTip = val;
        });

        globalEventsManager.hideSubNavbar.subscribe((mode)=> {
            this.hideSubNavbar = mode;
        });

    }
}
