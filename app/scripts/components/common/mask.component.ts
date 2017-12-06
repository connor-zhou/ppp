/**
 * Created by leiliang on 2016/10/11.
 */
import {Component, ElementRef} from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    selector:'mask',
    templateUrl:'../../views/common/mask.component.html',
    styles: [require("../../views/common/mask.component.less")]
})

export class MaskComponent{

    show:boolean;
    text:string;
    constructor(
        private globalEventsManager:GlobalEventsManager,
    ){
        this.show = false;
        this.text = '加载中...';

        this.globalEventsManager.mask.subscribe((val) => {
            this.show = val.show;
            this.text = val.text ? val.text+'...':'加载中...'
        })
    }

}