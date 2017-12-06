/**
 * Created by LLL on 2016/9/27.
 */
import {Injectable} from '@angular/core';
import {GlobalEventsManager} from "./GlobalEventManager.service";

@Injectable()
export class TipService {

    constructor(
        private globalEventsManager:GlobalEventsManager
    ) {
    }

    show(info:string,timeout?:number){
        let obj ={
            show:true,
            text:info,
            timeout: timeout ? timeout:3000
        };
        this.globalEventsManager.tip.emit(obj);
    }

}