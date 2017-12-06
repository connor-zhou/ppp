import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProjectService} from "../../services/Project.service";
import {Config} from "../../services/Config.service";
import  { Base64 } from '../../services/Base64.service';
import {ProjectModel} from "../../models/project.model";
import {AccountService} from "../../services/Account.service";
import {BfService} from "../../services/Bf.service";
import {TipService} from "../../services/Tip.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    templateUrl:"../../views/invest/confirmInvest.component.html",
    styles:[require("../../views/invest/confirmInvest.component.less")]
})

export class ConfirmInvestComponent{

    public rateTickets:any = [];
    public cashTickets:any = [];
    public modalType:string;

    public  scale:number = 0.005;

    private projectInfo:any = new ProjectModel();

    private pageSize:number = 9;

    public data:any = {
      agree:true,
      money:3000.00,
      cashTicketIds:'',
      rateTicketId:'',
      cashTicketTotalValue:0,
      rateTicketValue:0,
      callbackUrl:'',
      projectId:'',
      pageNumber:1
    };


    public accountInfo:any = {
        money:6000.00
    };

    public tempData:any ={
        cashIdsArray:[],
        cashTicketIds:'',
        rateTicketId:'',
        cashTicketTotalValue:0,
        rateTicketValue:0,
        totalPage:0
    };


    public form:any ={
        url:'',
        keys:[],
        maps:[]
    };

    public isLogin:boolean = false;

    public agreement:any;

    private rateProfit:any ={
        isUse:0,
        profit:''

    };

    constructor(
        private route: ActivatedRoute,
        private Project:ProjectService,
        private Base64:Base64,
        private Config:Config,
        private Account:AccountService,
        private Bf:BfService,
        private Tip:TipService,
        private sanitizer:DomSanitizer

    ){

        this.route.params.subscribe(val =>{
            if(val.money) this.data.money = val.money;
            if(val.id) this.data.projectId = val.id;

            this.data.maxSelectMoney = this.data.money * this.scale;
            this.getProjectInfo();
            this.getAccountInfo();
            this.getRateValue();

        });


    }


    // 能否选中券
    public canSelectTicket(type:string,id:string,value:string,money?:string){

        if(this.isSelectedTicket(type,id)) return true;
        if(type == 'cash'){
            let v = parseFloat(value);
            let m = parseFloat(money);

            // ① 投资额需不小于券要求；② 所有选择券抵扣不能超过投资额一定比例（scale）。
            return this.data.money >= m  &&  this.tempData.cashTicketTotalValue + v <= this.data.maxSelectMoney
        }else if(type == 'rate'){
            if(this.tempData.rateTicketId){
                return false;
            }else{

                return true;
            }
        }

    }

    // 是否已选中
    public isSelectedTicket(type:string,id:string){

        if(type == 'cash'){
            let regStr = '[,\s]?'+id+'[,\s]?';
            // let regStr = '(?![\\d\\w])'+id+'(?![\\d\\w])';
            let reg = new RegExp(regStr);
            return reg.test(this.tempData.cashTicketIds);
        }else if(type == 'rate'){
            return this.tempData.rateTicketId == id
        }

    }


    // 确认选中
    public forSureSelect(type:string){
        if(type == 'cash'){
            this.data.cashTicketIds = this.tempData.cashTicketIds;
            this.data.cashTicketTotalValue = this.tempData.cashTicketTotalValue;
        }else if(type == 'rate'){
            this.data.rateTicketId = this.tempData.rateTicketId;
            this.data.rateTicketValue = this.tempData.rateTicketValue;
            this.getRateValue();
        }
    }



    // 选券
    public selectTicket(type:string,id:string,value:string,money:string){

        let v = parseFloat(value);
        if(type == 'cash'){
            if(!this.canSelectTicket(type,id,value,money))return;
            if(this.isSelectedTicket(type,id)){
                this.tempData.cashIdsArray.forEach((val,key) => {
                    if(val == id){
                        this.tempData.cashIdsArray.splice(key,1);
                        return
                    }
                });
                this.tempData.cashTicketIds = this.tempData.cashIdsArray.join(',');
                this.tempData.cashTicketTotalValue -= v;
            }else{
                this.tempData.cashIdsArray.push(id);
                this.tempData.cashTicketIds = this.tempData.cashIdsArray.join(',');
                this.tempData.cashTicketTotalValue += v
            }

        }else if(type == 'rate'){
            if(!this.canSelectTicket(type,id,value))return;
            if(this.isSelectedTicket(type,id)){
                this.tempData.rateTicketId = '';
                this.tempData.rateTicketValue = 0;
            }else{
                this.tempData.rateTicketId = id;
                this.tempData.rateTicketValue = v;
            }
        }
    }




    // 获取可用加息券
    public getAvailRateTicket(pageNumber:number){
        this.Account.getRateTickets(pageNumber,this.pageSize,1).then(res =>{
            this.tempData.totalPage = Math.ceil(res.count / this.pageSize);
            this.rateTickets = res.recordList },err =>{
            this.tempData.totalPage = 0;
            this.rateTickets =[];
            }
        )
    }

    // 获取可用现金券
    public getAvailCashTicket(pageNumber:number){
        this.Account.getCashTickets(pageNumber,this.pageSize,1,this.data.money).then(res =>{
            this.tempData.totalPage = Math.ceil(res.count / this.pageSize);
            this.cashTickets = res.recordList;
            },err =>{
                this.tempData.totalPage = 0;
                this.cashTickets =[];
            }
        )
    }


    // 打开模态框
    public openModal(type:string){

            this.modalType = type;
            if(type == 'cash'){
                this.tempData.cashTicketTotalValue = this.data.cashTicketTotalValue;
                this.tempData.cashTicketIds = this.data.cashTicketIds;
                this.tempData.cashIdsArray = this.data.cashTicketIds ? this.data.cashTicketIds.split(','):[];
            }else if(type == 'rate'){
                this.tempData.rateTicketId = this.data.rateTicketId;
                this.tempData.rateTicketValue = this.data.rateTicketValue;
            }

            jQuery('#coupon-modal-01').modal({show:true})
    }


    private getProjectInfo(){
        this.Project.detail(this.data.projectId).then(res =>{
                this.projectInfo = new ProjectModel(res);

                if(this.projectInfo.canUseCashTicket == 1){
                    this.getAvailCashTicket(1);
                }
                if(this.projectInfo.canUseRateTicket == 1){
                    this.getAvailRateTicket(1);
                }
            },err =>{}
        )
    }

    // 确认投资
    confirm(){
        if(!this.data.agree) return;

        // 投资金额是通过链接传入，避免用户更改后超过账户余额。
        if(this.projectInfo.maxInvest >= this.projectInfo.minInvest  && parseFloat(this.accountInfo.money) < parseFloat(this.data.money)){
            this.Tip.show('投资金额不能超过账户余额');
            return;
        }

        this.isLogin = true;
        this.goInvestUrl()
    }



    goInvestUrl(){

        this.data.callbackUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/invest/result/'+this.data.projectId);

        let input = {
            projectId:this.data.projectId,
            money:this.data.money,
            cashTicketIds:this.data.cashTicketIds,
            cashTicketTotalValue:this.data.cashTicketTotalValue,
            rateTicketId:this.data.rateTicketId,
            callbackUrl:this.data.callbackUrl
        };

        this.Bf.toInvest(input).then(res=>{
            this.form.url = res.url;
            this.form.keys = Object.keys(res.maps);
            this.form.maps = res.maps;

            let self = this;
            let timer = window.setTimeout(()=>{
                jQuery("#bfInvestForm").submit();
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



    // 选页
    selectPage(e:any){
        this.data.pageNumber = e.currentPage;
        this.modalType == 'cash' ? this.getAvailCashTicket(this.data.pageNumber):this.getAvailRateTicket(this.data.pageNumber);
    }

    // 得到账户信息
    private getAccountInfo(){
        this.Account.refreshAccountInfo().then(res => {
            this.accountInfo.money = res.money;},err => {}
        )
    }


    public openAgreement(){

        this.Project.agreementConsult(this.data.projectId,this.data.money).then(res=>{
            this.agreement = this.sanitizer.bypassSecurityTrustHtml(res.html);
            jQuery('#agreementConsult').modal({show:true})
        },err=>{})

    }

    //计算加息利息
    public getRateValue(){
        let data = {
            projectId:this.data.projectId,
            money:this.data.money,
            rateTicketId:this.data.rateTicketId
        };
        this.Account.getProfitCalculation(data).then(
            res => {
                this.rateProfit.profit = res.profit;
            },err => {

            }
        )

    }


}
