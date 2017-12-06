import { Component,OnInit } from '@angular/core';
import { AccountService } from '../../services/Account.service'
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";
import {EventService} from "../../services/Event.service";
@Component({
    selector:'ban',
    templateUrl:'../../views/index/banner.component.html',
    styles:[require('../../views/index/banner.component.less')]
})

export class BannerComponent implements OnInit{
    private isLogin : boolean;
    private signInfo :any;
    private isSign :any;
    private accountInfo:any;
    private isHideBalance : boolean;
    private hideText:string;

    private slides:any = [];
    private active = '';
    constructor( private Account:AccountService,private globalEventManager:GlobalEventsManager,private Event:EventService){
        this.isLogin = Account.hasLogin();
        this.hideText = '隐藏余额';
        this.isHideBalance = false;

        this.Event.carousel(0).then(
            res => {
                if(res && res['length'] > 0){
                    this.active = res[0]['id'];
                    this.slides = res;
                }
            },
            err =>{
                this.slides = [];
            }

        );

        this.globalEventManager.logoutSuccess.subscribe(
            res => {
               this.isLogin = !res;
            }
        );
    }

    ngOnInit(){



        if(this.isLogin){
            this.Account.refreshAccountInfo(1).then(
                res => {
                    if(res){
                        this.accountInfo = res;
                        this.isSign = res['isSign'];
                    }
                },
                error => {
                    console.log(error);
                }
            )
        }
    }

    // signIn(){
    //     if(this.isSign === 0){
    //         this.Account.sign().then(
    //             res => {
    //                 this.signInfo = res;
    //                 this.Account.refreshAccountInfo().then(
    //                     res => this.isSign = res['isSign']
    //                 )
    //             },
    //             error => console.log(error)
    //         )
    //     }
    // }

    hideBalance(){
        this.isHideBalance = !this.isHideBalance;
        if(this.isHideBalance){
            this.hideText = '显示余额'
        }else{
            this.hideText = '隐藏余额'
        }
    }

}
