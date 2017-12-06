import { Component } from '@angular/core';

import {AccountService} from "../../services/Account.service";
import {CommonService} from "../../services/Common.service";
import {MmmService} from '../../services/Mmm.service';
import  { Base64 } from '../../services/Base64.service';
import  { Config } from '../../services/Config.service';
import {Router} from "@angular/router";
import {TipService} from "../../services/Tip.service";
import {BfService} from "../../services/Bf.service";



@Component({
    templateUrl:'../../views/my/withdraw.component.html',
    styles:[require('../../views/my/withdraw.component.less')]
})

export class WithdrawComponent{

    private bankCardList:any;
    // private bankExist :boolean;
    private selectBank:any = {
        id:'',
        cardNo:'',
        bankName:'',
        bankAbbr:''
    };
    private page:number = 0;

    private userInfo = {
        money:0,
        realName:'',
        phone:'',
        isUseTickt:0
    };

    public withdrawData:any = {
        id:'',
        money:'',
        isUseTickt:0,
    };
    private moneyTip:any;

    private withurl:any;

    private dataRes:any = {
        maps:'',
        keys:[]
    };
    private successUrl:any;
    private actionUrl:any;
    private isTo:boolean = true;


    constructor(

        private accountService:AccountService,
        private commonService:CommonService,
        private Base64:Base64,
        private Config:Config,
        private router:Router,
        private Tip:TipService,
        private bfService:BfService

    ){

        this.withdrawData.isUseTickt = 1;
        this.bankCardList = [];
        this.getAccountInfo();

        this.getWithdrawTickets();

    }

    private getAccountInfo(){
        this.accountService.refreshAccountInfo().then(res=>{
            this.userInfo.money = parseFloat(res.money);
            this.userInfo.realName = res.realname;
            this.userInfo.phone = res.phone;
            if(res.isOpenBf == 0){
                jQuery('#mmm-warning-withdraw').modal('show');
            }else {
                this.getBankCardList();
            }

        },err=>{

        });
    }

    private getWithdrawTickets(){
        this.accountService.getWithdrawTickets().then(
            res => {
                this.userInfo.isUseTickt = res.unusedCount;
                if(this.userInfo.isUseTickt > 0){
                    this.withdrawData.isUseTickt = 1;
                }else {
                    this.withdrawData.isUseTickt = 0;
                }
            },err =>  {
                this.userInfo.isUseTickt = 0;
            }
        )
    }

    public getBankCardList(){
        this.accountService.getBankCardList().then(res=>{
            this.bankCardList = res;
            if(this.bankCardList.length <= 0){
                this.submit();
            }else {
                this.withdrawData.id = this.selectBank.id;

                this.selectBank.id = this.bankCardList[0].id;
                this.selectBank.cardNo = this.bankCardList[0].cardNo;
                this.selectBank.bankAbbr = this.bankCardList[0].bankAbbr;
                this.selectBank.bankName = this.bankCardList[0].bankName;
            }
        },err=>{
            this.bankCardList = [];
        });
    }



    public sub(){
        this.page = this.page - 1;
    }

    //下一步
    public add(){
        if(this.bankCardList.length < 0) return;
        let money = this.withdrawData.money;
        let userMoney = Number(this.userInfo.money);

        if(money == '' ){
            this.moneyTip = "提现金额不能为空";
            return false
        }else if(money <= 0){
            this.moneyTip = "提现金额不能小于0";
            return false
        }else if (!this.checkNumber(money)){
            this.moneyTip = "请输入正确的金额";
            return false
        }else if(money > userMoney) {
            this.moneyTip = "提现金额小于可用金额";
            return false
        }else {
            this.page = this.page + 1
        }


    }

    private toRequestUrl(){
        // this.withdrawData.isUseTickt = 0;
        // this.router.navigate(['/my/platform'], {queryParams: {money: this.withdrawData.money,cardId:this.withdrawData.id,isUseTicket:this.withdrawData.isUseTickt,type:'withdraw'}});
        this.isTo = false;
        this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/fund');
        this.bfService.toWithdraw(this.withdrawData.money, this.successUrl,this.withdrawData.id, this.withdrawData.isUseTickt, false).then(res=>{

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

    //检查是否为数字
    private checkNumber(num){
        let reg =/^\d+(\.\d{1,2})?$/;
        if (!reg.test(num)) {
            return false;
        }
        return true;

    }

    //清除提示
    private clearMoneyTip(){
        this.moneyTip = "";
        // this.withdrawData.money = '';
    }

    //提示绑定银行卡
    public submit(){
        jQuery('#warning-bank').modal('show');
        return true;
    }




}
