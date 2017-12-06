/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,Input } from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";


@Component({
    selector:'xtz-sub-footer',
    templateUrl: '../../views/common/footer.sub.component.html',
    styles:[require('../../views/common/footer.sub.component.less')]
})
export class SubFooterComponent {
    hideSubNavbar:boolean = true;
    constructor(
        private globalEventsManager:GlobalEventsManager
    ){

        globalEventsManager.hideSubNavbar.subscribe((mode)=> {
            this.hideSubNavbar = mode;
        });

    }
}

