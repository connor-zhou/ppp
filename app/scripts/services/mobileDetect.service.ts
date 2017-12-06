
//  * Created by leiliang on 2016/9/27.

import { Injectable }       from '@angular/core';
import {
    Router,
    CanLoad,Route
}                           from '@angular/router';

import {UAService} from "./UA.service";

@Injectable()
export class MobileDetect implements CanLoad {

    private UA:any;
    constructor(private router: Router,private UAService:UAService) {}


    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return this.canActivate(route, state);
    // }

    canLoad(route : Route): boolean {
        console.log('canLoad');
        this.UA = this.UAService.getUAService();
        let name = this.UA.getOS().name.toUpperCase();
        if(/IOS|ANDROID|SYMBIAN|FIREFOX OS|BLACKBERRY|WEBOS|PALM|QNX|BADA|RIM|MEEGO|CONTIKI|CHROMIUM OS|WINDOWS OS/.test(name)){
            window.location.href = 'http://m.xingtouzi.com';
            return false;
        }
        return true;
   }
}