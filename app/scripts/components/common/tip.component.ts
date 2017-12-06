/**
 * Created by leiliang on 2016/10/11.
 */
import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    selector:'tip',
    encapsulation: ViewEncapsulation.None,
    templateUrl:'../../views/common/tip.component.html',
    styles:[require('../../views/common/tip.component.less')]
})

export class TipComponent{

    tip:any = {
        show:false,
        text:'',
        timeout:3000
    };

    constructor(
        private globalEventsManager:GlobalEventsManager,
    ){

        this.globalEventsManager.tip.subscribe((obj) => {

            this.tip.text = obj.text;
            this.tip.show = obj.show;
            obj['timeout'] && (this.tip.timeout = obj['timeout']);

            let self = this;
            if(this.tip.show){
                let timer = window.setTimeout(function(){
                    self.tip.show = false;
                    window.clearTimeout(timer);
                },this.tip.timeout);
            }
        })
    }

}