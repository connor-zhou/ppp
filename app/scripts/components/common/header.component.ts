/**
 * Created by leiliang on 2016/10/11.
 */
import { Component,Input,OnInit } from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";
import {MessageService} from "../../services/Message.service";
import {CommonService} from "../../services/Common.service";
import {Router} from "@angular/router";
import {Config} from "../../services/Config.service";

@Component({
    selector:'xtz-header',
    templateUrl:'../../views/common/header.component.html',
    styles:[require('../../views/common/header.component.less')]
})

export class HeaderComponent implements OnInit{

    hideNavbar:boolean = false;

    private hasLogin:boolean;

    private bbsUrl:string = 'http://www.xingtouzi.com/platform/login?url=http://platform.xingtouzi.com';

    private userInfo = {
        username:'',
        hasUnreadMsg:0,
        unreadMsgNum:0
    };
    constructor(
                private Account:AccountService,
                public CommonService:CommonService,
                private globalEventManager:GlobalEventsManager,
                private Message:MessageService,
                private router:Router,
                private Config:Config
        ){
        this.hasLogin = this.Account.hasLogin();

        this.globalEventManager.hideNavbar.subscribe(
            (val:any) =>{
                this.hideNavbar = val;
            }
        );

        this.globalEventManager.loginSuccess.subscribe(
            res => {
                this.hasLogin = res;
                this.getAccountInfo();
            }
        );

        this.globalEventManager.logoutSuccess.subscribe(
            res => {
                this.hasLogin = !res;
            }
        );

        this.globalEventManager.msgNumberChange.subscribe(
            res => {
                this.getAccountMsgBrief();
            }
        );

        //

        this.globalEventManager.alterNicknameSuccess.subscribe(
            res => {
                this.getAccountInfo();
            }
        );

        this.getAccountInfo();
    }

    ngOnInit(){
        // if(this.userInfo.hasUnreadMsg == 1){
        //     this.getAccountMsgBrief();
        // }
    }

    getAccountInfo(){
        if(this.hasLogin){
            this.Account.refreshAccountInfo(1).then(
                res => {
                    if(res){
                        this.userInfo.username = res.nickname ? res.nickname : res.mobile;
                        this.getAccountMsgBrief();
                    }
                },
                err => {

                });
        }
    }
    getAccountMsgBrief(){
        this.Message.getAccountMessageBrief().then(
            res =>{
                this.userInfo.unreadMsgNum = res.count;
            },
            err =>{}
        )
    }
    logout(){
        this.Account.logout().then(res=>{
            this.router.navigate(['/index']);
        },err=>{});
    }

    public getBBSLoginUrl(){
        if(this.hasLogin){
            this.CommonService.getBBSLoginUrl().then(res=>{
                window.location.href = res.url;
            },err=>{
                window.location.href = '/sign/login';
            });
        }else{
            window.location.href = '/sign/login';
        }
    }

}