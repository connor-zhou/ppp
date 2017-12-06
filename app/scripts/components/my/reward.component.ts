import { Component } from '@angular/core';

import {AccountService} from "../../services/Account.service";

@Component({
    templateUrl:'../../views/my/reward.component.html'
})

export class RewardComponent{

    private registerCount:any = 0;
    private nameAuthCount:any = 0;
    private investCount:any = 0;
    private awardCount:any = 0;
    private moneyCount:any = 0;
    private recordList:any[] = [];

    constructor(private accountService:AccountService){
        this.getMyInvitation();
    }

    public getMyInvitation():void{
        let pageSize = 10000;
        let pageNumber=1;
        this.accountService.getMyInvitation(pageSize, pageNumber).then(res=>{
            this.registerCount = res.registerCount;
            this.nameAuthCount = res.nameAuthCount;
            this.investCount = res.investCount;
            this.awardCount = res.awardCount - 0;
            this.moneyCount = res.moneyCount - 0;
            this.recordList = res.pageList;
        },err=>{
            this.registerCount = 0;
            this.nameAuthCount = 0;
            this.investCount = 0;
            this.awardCount = 0;
            this.moneyCount = 0;
            this.recordList = [];
        });
    }
}
