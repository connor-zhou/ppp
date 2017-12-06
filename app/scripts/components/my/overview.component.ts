import {Component} from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {TipService} from "../../services/Tip.service";
import {AccountInfoModel} from "../../models/accountInfo.model";


@Component({
    templateUrl: '../../views/my/overview.component.html',
    styles:[require('../../views/my/overview.component.less')]
})

export class OverviewComponent {
    public userInfo = {
        capitalTotal: 0,
        money: 0,
        capitalWill: 0,
        interestWill: 0,
        coins:0,
        ticketsNumber:0,
        interestTicketsNumber:0
    };

    public accountInfo:any;

    private bankList:any = {
        id:'',
        cardNo:'',
        bankName:'',
        bankAbbr:'',

    };

    constructor(
        public accountService: AccountService,
        public Tip:TipService
    ) {

        this.accountInfo = new AccountInfoModel();

        this.getAccountInfo();
        this.getBankList();


    }

    //账户信息
    private getAccountInfo(){
        this.accountService.getAccountInfo().then(
            res => {
                if(res){
                    this.accountInfo = new AccountInfoModel(res);
                }
            }
        )
    }

    //获取银行卡信息
    private getBankList(){
        this.accountService.getBankCardList().then(
            res => {
                if(res.length > 0){
                    this.bankList.id = true;
                }else {
                    this.bankList.id = false;
                }
                // this.bankList.id = false;

            },err =>{

            }
        )
    }

    public sign(){
        if(this.accountInfo.isSign == 1){
            this.Tip.show('您已经签过到了哦');
            return;
        }

        this.accountService.sign().then(res=>{
            this.accountService.refreshAccountInfo().then(res =>{
                this.accountInfo = new AccountInfoModel(res);
            },err =>{})
        },err=>{
            if(err.text){
                this.Tip.show(err.text);
            }
        })
    }



}