/**
 * Created by leiliang on 2016/10/11.
 */
import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {BfService} from "../../services/Bf.service";
import {Base64} from "../../services/Base64.service";
import {Config} from "../../services/Config.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TipService} from "../../services/Tip.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";
@Component({
    selector:'activate',
    templateUrl:'../../views/common/activate.component.html',
    styles:[require('../../views/common/activate.component.less')]
})

export class ActivateComponent  implements OnInit{

    isActivate:boolean = false;

    hasLogin:boolean = false;

    isLogin:boolean = false;

    currentUrl:string = '';

    moneyOldSystem:number = 0;

    isShow:boolean = true;

    public form:any ={
        url:'',
        keys:[],
        maps:[]
    };

    private data:any = {
        callbackUrl:''
    };


    constructor(
        private Account:AccountService,
        private Bf:BfService,
        private Base64:Base64,
        private Config:Config,
        private router:Router,
        private Tip:TipService,
        private GlobalEventsManager:GlobalEventsManager
    ){

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((e:any) =>{

                this.currentUrl = e.urlAfterRedirects;
                this.hasLogin = this.Account.hasLogin();

                if(this.Account.hasLogin()){
                    this.Account.getAccountInfo().then(res=>{
                        this.isActivate = res.isActivate == 1 ? true:false;
                        if(res.moneyOldSystem){
                            this.moneyOldSystem = res.moneyOldSystem - 0;
                        }
                    },err=>{})
                }
            })

        this.GlobalEventsManager.logoutSuccess.subscribe(val =>{this.hasLogin = this.Account.hasLogin();})
    }

    ngOnInit(){}

    activate(){

        if(this.isLogin) return ;

        this.data.callbackUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+this.currentUrl);

        this.isLogin = true;

        this.Bf.toActivate(this.data).then(res=>{
            this.form.url = res.url;
            this.form.keys = Object.keys(res.maps);
            this.form.maps = res.maps;

            let self = this;
            let timer = window.setTimeout(()=>{
                jQuery("#toActivateForm").submit();
                // self.isLogin = false;
                window.clearTimeout(timer);
            },0);
        },err=>{
            this.isLogin = false;
            if(err.text){
                this.Tip.show(err.text);
            }
        })
    }


    transfer(){

        if(this.isLogin) return ;

        this.data.callbackUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+this.currentUrl);

        this.isLogin = true;

        this.Bf.toTransfer(this.data).then(res=>{
            this.form.url = res.url;
            this.form.keys = Object.keys(res.maps);
            this.form.maps = res.maps;

            let self = this;
            let timer = window.setTimeout(()=>{
                jQuery("#toActivateForm").submit();
                // self.isLogin = false;
                window.clearTimeout(timer);
            },0);
        },err=>{
            this.isLogin = false;
            if(err.text){
                this.Tip.show(err.text);
            }
        })
    }

}