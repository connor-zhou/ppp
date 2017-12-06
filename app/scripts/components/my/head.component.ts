import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {Config} from '../../services/Config.service';
import {error} from "util";

@Component({
    selector:'my-head',
    templateUrl:'../../views/my/head.component.html',
    styles:[require('../../views/my/head.component.less')]
})

export class HeadComponent implements OnInit {
    elementRef: ElementRef;

    public userInfo = {
        hasBankCards: false,
        uname:'',
        avatar:'',
        hasEmail:false,
        isOpenMmm:false
    };

    constructor(@Inject(ElementRef) elementRef: ElementRef, public accountService:AccountService) {
        this.userInfo.avatar = require( '../../../images/avatar.png');

        this.elementRef = elementRef;

        accountService.getBankCardList().then(res=>{
            this.userInfo.hasBankCards = res && (res.length > 0);
        },err=>{});

        accountService.refreshAccountInfo().then(res=>{
            this.userInfo.uname = res.uname;
            //noinspection TypeScriptUnresolvedVariable
            this.userInfo.hasEmail = !!(res.email) && (res.email.length > 0);

            res.photo && (this.userInfo.avatar = res.photo);
        },err=>{

        });

        accountService.refreshUserHasOpenMmm().then(res=>{
            this.userInfo.isOpenMmm = true;
        },err=>{

        });

    }

    ngOnInit() {
    }
}