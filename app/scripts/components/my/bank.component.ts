import { Component } from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {CommonService} from "../../services/Common.service";
import {MmmService} from "../../services/Mmm.service";
import {Base64} from "../../services/Base64.service";
import  { Config } from '../../services/Config.service';
import {Router} from "@angular/router";
import {BfService} from "../../services/Bf.service";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl:'../../views/my/bank.component.html',
    styles:[require('../../views/my/bank.component.less')]
})


export class BankComponent{
    private bankCardList:any = {
        id:'',
        cardNo:'',
        bankName:'',
        bankAbbr:''
    };

    public modalType = '';

    private successUrl:any;
    private actionUrl:any;

    private dataRes:any = {
        maps:'',
        keys:[]
    };
    private isTo:boolean = true;









    constructor(
        private accountService:AccountService,
        private commonService:CommonService,
        private Base64:Base64,
        private Config:Config,
        private router:Router,
        private bfService:BfService,
        private Tip:TipService
    ){
        this.accountService.refreshAccountInfo().then(res=>{
            if(res.isOpenBf == 0){
                jQuery('#mmm-warning-recharge').modal('show');
            }else {
                this.getBankCardList();
            }
        },err=>{

        });

    }


    public getBankCardList():void{
        this.accountService.getBankCardList().then(res=>{

            if(res.length <= 0){
                this.bankCardList = [];
            }else {
                this.bankCardList = res;
            }
        },err=>{
            this.bankCardList = [];
        });
    }

    //解绑银行卡
    private toUnbindBankcard(){
        this.bfService.unbindBankcard(this.bankCardList[0].id).then(
            res => {
                this.getBankCardList();
            },err => {
                this.getBankCardList();
            }
        )
    }

    //绑定银行卡
    private toRequestUrl(){
        // this.router.navigate(['/my/platform'], {queryParams: {type:'bank'}});
        this.isTo = false;
        this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/bank');
        this.bfService.toBindBankcard(this.successUrl).then(res=>{

            this.dataRes.maps = res.maps;
            this.dataRes.keys = Object.keys(res.maps);
            this.actionUrl = res.url;
            let timer = window.setTimeout(()=>{
                jQuery("#request-form").submit();
                window.clearTimeout(timer);
            },0);
            this.isTo = true;
        },err=>{
            this.isTo = false;
            this.back('/my/bank');
            if(err.text){
                this.Tip.show(err.text);
            }

        });
    }

    public back(url:string){
        let timer = window.setTimeout(() => {
            this.router.navigate([url]);
            window.clearTimeout(timer);
        },2000);

    }


    // public addBankCard():void{
        // this.callbackUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/bank');
        // this.bfService.addBankCard(this.callbackUrl).then(
        //     res => {
        //         this.actionUrl = res.url+"?"+res.maps;
        //         this.getBankCardList();
        //     },err =>{
        //         this.getBankCardList();
        //     }
        // )
    // }



    // public removeBankCard():void{
    //     this.mmmService.rmBankCard(this.removingCardId).then(res=>{
    //         this.getBankCardList();
    //     },er=>{
    //         this.getBankCardList();
    //     });
    // }
    //
    // public removeBankCard():void{
    //     this.accountService.removeBankCard(this.removingCardId).then(res=>{
    //         this.getBankCardList();
    //     },er=>{
    //         this.getBankCardList();
    //     });
    // }






    // public submit(){
    //     // this.addBankCard();
    //     jQuery('#card-add-remove').modal('show');
    //     return true;
    // }




    //
    // public updateAction(){
    //     let timer = window.setTimeout(() =>{
    //         window.clearTimeout(timer);
    //         jQuery('#card-add-remove').modal('hide');
    //     },1000)
    // }

    // public  add(){
    //     this.page = this.page + 1;
    //
    // }
    // public sub(){
    //     this.page = this.page - 1;
    // }



}
