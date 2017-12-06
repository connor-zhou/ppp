
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
export class SignGuard implements CanLoad,CanActivate {

    constructor(private Account:AccountService, private router: Router) {}


    canLoad(route : Route): boolean {

        return this.checkLogin();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        return this.checkLogin();
    }

    private checkLogin(): boolean {

        if (!this.Account.hasLogin()) { return true; }

        this.router.navigate(['/my/overview']);

        return false;
    }
}