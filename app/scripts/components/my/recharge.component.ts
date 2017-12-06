import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AccountService} from "../../services/Account.service";
import {MmmService} from '../../services/Mmm.service';
import  { Base64 } from '../../services/Base64.service';
import  { Config } from '../../services/Config.service';
import {UAService} from "../../services/UA.service";

import { Subject } from 'rxjs/Subject';
import {TipService} from "../../services/Tip.service";
import {BfService} from "../../services/Bf.service";


@Component({
    templateUrl:'../../views/my/recharge.component.html',
    styles:[require('../../views/my/recharge.component.less')]
})

export class RechargeComponent implements OnInit{

    private page:number = 0;
    private onlineMoney:any;
    private userInfo = {
        money:0,
        realName:'',
        phone:'',
        isOpenBf:0
    };
    private errTip:any = {
        moneyTip:'',
        method:'',
        payWayTip:''
    };

    private bankCardList:any=[];
    private dataRes:any = {
        maps:'',
        keys:[]
    };
    private successUrl:any;
    private actionUrl:any;

    private isTo:boolean = true;



    constructor(
        private accountService:AccountService,
        private Config:Config,
        private route:ActivatedRoute,
        private router:Router,
        private Tip:TipService,
        private bfService:BfService,
        private Base64:Base64,
    ){
        this.errTip.method = 0;
        this.accountService.refreshAccountInfo().then(res=>{
            this.userInfo.money = parseFloat(res.money);
            this.userInfo.realName = res.realName;
            this.userInfo.phone = res.phone;
            this.userInfo.isOpenBf = res.isOpenBf;
            if(res.isOpenBf == 0){
                jQuery('#mmm-warning-recharge').modal('show');
            }else {
                this.getBankCardList();
            }


        },err=>{

        });


        // this.onlineMoney.debounceTime(1000)
        //     .distinctUntilChanged()
        //     .map(term => this.checkNumber(this.onlineMoney))
        //     .subscribe(results => {});

    }

    ngOnInit(){
        // this.route.params.forEach((params: Params) => {
        //     this.successUrl = params['successUrl'] ? params['successUrl'] :
        //         this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/fund');
        //     this.failUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/recharge');
        //     if(params['money']){
        //         this.onlineMoney = parseFloat(params['money']).toFixed(2);
        //         // this.onlineMoney = parseFloat(this.onlineMoney).toFixed(2);
        //         // this.requestRechargeUrl(this.onlineMoney);
        //     }
        //
        // });
    }


    private toRequestUrl(){
        // this.router.navigate(['/my/platform'], {queryParams: {money: this.onlineMoney,method:this.errTip.method,type:'recharge'}});

        this.isTo = false;
        this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/fund');
        this.bfService.toRecharge(this.onlineMoney , this.errTip.method, this.successUrl, false).then(res=>{
            this.dataRes.maps = res.maps;
            this.dataRes.keys = Object.keys(res.maps);
            this.actionUrl = res.url;
            let timer = window.setTimeout(()=>{
                jQuery("#request-form").submit();
                window.clearTimeout(timer);
            },0);

        },err=>{
            this.isTo = true;
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

    public getBankCardList(){
        this.accountService.getBankCardList().then(res=>{
            this.bankCardList = res;
            if( this.bankCardList.length <= 0){
                this.submit();
            }
        },err=>{
            this.bankCardList = [];
        });
    }

    public submit(){
        jQuery('#warning-bank').modal('show');
        return true;
    }



    //下一步
    public add(){
        if(parseFloat(this.onlineMoney) <=0 ){
            this.errTip.moneyTip = "请输入不小于0的金额";
            return false
        }else if (!this.checkNumber(this.onlineMoney)){
            this.errTip.moneyTip = "请输入有效的金额";
            return false
        }else if (parseFloat(this.onlineMoney) > 1000000 ){
            this.errTip.moneyTip = "金额不能大于1百万元";
            return false
        }else {
            this.page = this.page + 1;
        }

    }
    //退一步
    public sub(){
        this.page = this.page - 1;
    }

    //检查是否为数字  /^\+?[1-9][0-9]*$/
    private checkNumber(num){
        let reg =/^\d+(\.\d{1,2})?$/;
        if (!reg.test(num)) {
            return false;
        }
        return true;

    }



    //清除提示
    private clearTip(num){
        if(num == 1){
            this.errTip.moneyTip = "";
        }
        if(num == 2){
            this.errTip.payWayTip = "";
        }
    }

    //重新充值
    public redo(){
        this.page = 0;
        this.onlineMoney = '';
        this.errTip.method = 0;
    }




    // public submit(){
    //     jQuery('#warning-bank').modal('show');
    //     return true;
    // }

    // public goHelpCenter(){
    //     jQuery('#mmm-recharge').modal('hide');
    //     this.router.navigate(['/help']);
    // }
    //
    // public rechargeSuccess():void{
    //     this.router.navigateByUrl(this.Base64.decode(this.successUrl).replace(this.Config.appConfig.appRootUrl, ''));
    // }





}
