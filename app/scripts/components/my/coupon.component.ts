import { Component } from '@angular/core';
import {AccountService} from "../../services/Account.service";

@Component({
    templateUrl:'../../views/my/coupon.component.html',
    styles:[require('../../views/my/coupon.component.less')]
})

export class CouponComponent{

    private switch:number = 0;
    private statusSwitch:number = 1;
    public totalPage:number;
    private tickets:any = [];
    // private tickets:any[] = [];
    private count = {
        cashTickets:0,
        withdrawTickets:0,
        rateTickets:0

    };
    queryParam:any = {
        pageSize:9,
        pageNumber:1,
        status:0,
    };
    private withdrawTicketNum:any = {
        usedCount:0,
        unusedCount:0
    };



    constructor(public accountService: AccountService){

        this.totalPage = 1;
        this.getAccountInfo();
        this.getMyTickets(0,1);




    }

    private getMyTickets(type:number, status:number,pageNum?:number) {
        this.queryParam.status = status;
        if (type == 0) {
            this.getCash(pageNum);

        }
        if (type == 1) {
            this.getWithdraw(pageNum);
        }

        if (type == 2) {
            this.getRate(pageNum);
        }

    }

    private getCash(number?:number){
        if(number){
            this.queryParam.pageNumber = number;
        }
        this.accountService.getCashTickets(this.queryParam.pageNumber,this.queryParam.pageSize,this.queryParam.status).then(res=> {
            this.tickets = res.recordList;
            this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
        }, err=> {
            this.tickets = null;
            this.totalPage = 0;
        });

    }

    private getWithdraw(number?:number){
        if(number){
            this.queryParam.pageNumber = number;
        }
        this.accountService.getWithdrawTickets().then(res=> {
            this.withdrawTicketNum = res;
            if(this.withdrawTicketNum.usedCount >0 || this.withdrawTicketNum.unusedCount > 0){
                this.totalPage = 1;
            }

        }, err=> {
            this.tickets = null;
            this.totalPage = 0;
        });
    }

    private getRate(number?:number){
        if(number){
            this.queryParam.pageNumber = number;
        }
        this.accountService.getRateTickets(this.queryParam.pageNumber,this.queryParam.pageSize,this.queryParam.status).then(res=> {
            this.tickets = res.recordList;
            this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);

        }, err=> {
            this.tickets = null;
            this.totalPage = 0;
        });
    }


    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.getMyTickets(this.switch,this.queryParam.status);
    }


    //账户信息
    private getAccountInfo(){
        this.accountService.refreshAccountInfo().then(
            res => {
                this.count.cashTickets = res.cashTicketsCount;
                this.count.withdrawTickets = res.withdrawTicketsCount;
                this.count.rateTickets = res.rateTicketsCount;
            }
        )
    }

    //投资券
    private getCashTickets(status:any){
        this.accountService.getCashTickets(this.queryParam.pageNumber,this.queryParam.pageSize,status).then(
            res => {

            },err => {

            }
        )
    }


}
