
//  * Created by leiliang on 2016/9/27.

import { Injectable }       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad,Route
}                           from '@angular/router';

import {AccountService} from "./Account.service";

@Injectable()
export class AuthGuard implements CanLoad,CanActivate {

    constructor(private Account:AccountService, private router: Router) {}


    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return this.canActivate(route, state);
    // }

    canLoad(route : Route): boolean {

        let url = window.location.pathname;
        return this.checkLogin(url);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {

        if (this.Account.hasLogin()) { return true; }

        // 保存登录之后需要重定向的url
        // this.Account.redirectUrl = url;

        this.router.navigate(['/sign/login']);
        return false;
    }
}