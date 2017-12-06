import { Component } from '@angular/core';
import {PlatformService} from "../../services/Platform.server";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl:"../../views/platform/info.component.html",
    styles: [require("../../views/platform/info.component.less")]
})

export class PlatformInfoComponent{

    platformInfo:any ={
        totalMoneySum:'0',
        tradeNumberSum:'',
        repayMoneyWill:'0',
        borrowerNumberSum:'',
        loanerNumberSum:'',
        borrowerNumber:'',
        loanerNumber:'',
        top10MoneyRate:'',
        top1MoneyRate:'',
        overtimeMoney:'0',
        overtimeNumber:'',
        overtime90Money:'0',
        overtime90Number:'',
        helpRepayMoney:'0',
        helpRepayNumber:'',
    };

    constructor(
        private Platform:PlatformService,
        private Tip:TipService
    ){
      Platform.getInfo().then(res =>{
          this.platformInfo.totalMoneySum = res.totalMoneySum;
          this.platformInfo.tradeNumberSum = res.tradeNumberSum;
          this.platformInfo.repayMoneyWill = res.repayMoneyWill;
          this.platformInfo.borrowerNumberSum = res.borrowerNumberSum;
          this.platformInfo.loanerNumberSum = res.loanerNumberSum;
          this.platformInfo.borrowerNumber = res.borrowerNumber;
          this.platformInfo.loanerNumber = res.loanerNumber;
          this.platformInfo.top10MoneyRate = res.top10MoneyRate;
          this.platformInfo.top1MoneyRate = res.top1MoneyRate;
          this.platformInfo.overtimeMoney = res.overtimeMoney;
          this.platformInfo.overtimeNumber = res.overtimeNumber;
          this.platformInfo.overtime90Money = res.overtime90Money;
          this.platformInfo.overtime90Number = res.overtime90Number;
          this.platformInfo.helpRepayMoney = res.helpRepayMoney;
          this.platformInfo.helpRepayNumber = res.helpRepayNumber;
      },err =>{
          if(err.text){
              this.Tip.show(err.text);
          }
      })
    }
}
