import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import {AccountService} from "../../services/Account.service";


@Component({
    selector:'my-menu',
    templateUrl:'../../views/my/menu.component.html',
    styles:[require('../../views/my/menu.component.less')]
})

export class MenuComponent implements OnInit {
    elementRef: ElementRef;

    private userInfo = {
        isOpenBf:'',
        isActivate:false,
        oldSystemMoney:0
    };

    constructor(
        @Inject(ElementRef) elementRef: ElementRef,
        private accountService:AccountService


    ) {
        this.elementRef = elementRef;
        this.getAccountInfo();
    }

    ngOnInit() {
    }

    private  getAccountInfo(){
        this.accountService.refreshAccountInfo().then(res=>{
            // if(res.isOpenMmm == 0){
            //     jQuery('#mmm-warning-recharge').modal('show');
            // }
            this.userInfo.isActivate = res.isActivate == 1 ? true:false;
            this.userInfo.isOpenBf = res.isOpenBf;
        },err=>{

        });
    }

}