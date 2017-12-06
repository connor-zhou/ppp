import { Component,AfterContentInit } from '@angular/core';

import {AccountService} from "../../services/Account.service";
import {Config} from "../../services/Config.service";
import {InvestRecordService} from "../../services/investRecord.service";
import {InvestRecordModel} from '../../models/investRecord.model';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/Project.service";
import {Base64} from "../../services/Base64.service";
import {LocalStrorageService} from "../../services/LocalStrorageService.service";
import {LoadingService} from "../../services/Loading.service";


@Component({
    templateUrl:'../../views/my/invest.component.html',
    styles:[require('../../views/my/invest.component.less')]
})

export class MyInvestComponent{

    private switch:number = 0;

    // private selectInfo ={
    //     money:0,
    //     revenue:0,
    //     title:''
    // };

    private userInfo ={
        capitalWill: 0,
        profitWill: 0,
        profitSum:0
    };

    // public investRecords:InvestRecordModel[];

    // public repaymentPlanRecords:InvestRecordModel[];


    public investmentRecords:any = [];

    queryParam:any = {
        pageSize:10,
        pageNumber:1,
        state:''
    };
    public totalPage:number = 1;

    public repaymentPlan:any;
    public executionInfo:any;
    public agreementLoan:any;
    public agreementConsult:any = {
        aname:'',
        aAccountName:'',
        aChinaId:'',
        aMobile:'',
        aAddress:'',
        bName:'',
        bAccountName:'',
        bChinaId:'',
        bAddress:'',
        money:'',
        upperMoney:'',
        startYear:'',
        startMonth:'',
        startDay:'',
        endYear:'',
        endMonth:'',
        endDay:'',
        rate:'',
        useType:'',
        repaymentMode:'',
        repayDay:'',
        theYear:'',
        theMonth:'',
        theDay:'',
    };



    private agreementLoanAll:any = {
        agreementLoanUrl:'',
        token:'',
        client:''
    };


    constructor(public accountService: AccountService, public investRecordService:InvestRecordService,
                private config:Config,
                private router:Router,
                private Project:ProjectService,
                private Base64:Base64,
                private LocalStorage:LocalStrorageService,
                private Loading:LoadingService
    ){
        this.setFlag(0);
        this.accountInfo();
        this.getAgreementLoan();
    }

    //初始收益
    public accountInfo(){
        this.accountService.refreshAccountInfo().then(res=> {
            this.userInfo.capitalWill = res.capitalWill;
            this.userInfo.profitWill = res.profitWill;
            this.userInfo.profitSum = res.profitSum;
        });
    }




    //获取投资记录
    public getInvestmentRecords(type:number){
        this.Loading.show(this.accountService.getInvestmentRecords(this.queryParam).then(
            res => {
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
                this.investmentRecords = res.recordList;
            },err => {
                this.investmentRecords = [];
            }
        ),type)
    }

    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.getInvestmentRecords(0);

    }

    public setFlag(flag:number):void{
        this.switch = flag;
        this.queryParam = {
            pageNumber:1,
            pageSize:10,
            state:flag == 4 ? '':flag
        };
        this.getInvestmentRecords(0);
    }

    // 贷后披露
    public getExecutionInfo(id:any){
        this.Project.getExecutionInfo(id).then(
            res => {
                this.executionInfo = res.info;
                this.execution();
            },err => {
                // console.log(err);
            }
        )
    }

    // 指定投资项目的还款计划
    public getRepaymentPlan(id:string){
        this.accountService.getRepaymentPlan(id).then(
            res => {
                this.repaymentPlan = res;
                this.repayment();
            },err => {
                // console.log(err);
            }
        )
    }

    // 指定投资项目的借款协议
    // public getAgreementLoan(investId){
    //     this.agreementLoanUrl = this.config.apiPath.account.agreementLoan + "?" + "";
    // }

    public getAgreementLoan(){
        let clientArguments = {
            type: 'website',
            version:this.config.appConfig.version,
            website:{
                ua:window.navigator.userAgent
            },
            language:'zh'
        };
        this.agreementLoanAll.client = this.Base64.encode(JSON.stringify(clientArguments));
        this.agreementLoanAll.token = this.LocalStorage.get('account.token');

        //https://192.168.1.86:3000/account/agreementLoan?client='sdfsaf'&token='adfasdf'&investId='1321'
        this.agreementLoanAll.agreementLoanUrl = this.config.apiPrefix + '/account/agreementLoan?client=' + this.agreementLoanAll.client + '&token=' + this.agreementLoanAll.token + '&investId=';


    }




    public execution(){
        jQuery('#execution-info').modal('show');
        return true;
    }

    public repayment(){
        jQuery('#loanPlanModal').modal('show');
        return true;
    }

    public agreement(){
        jQuery('#agreement-loan').modal('show');
        return true;

    }

    public agreementConsultBox(){

        jQuery('#agreement-consult').modal('show');
        return true;
    }




    // public getInvestContract(iid:string):string{
    //     //noinspection TypeScriptUnresolvedVariable
    //     return this.config.appConfig.contractUrl+iid;
    // }
    // public getInvestLoanContract(iid:string):string{
    //     //noinspection TypeScriptUnresolvedVariable
    //     return this.config.appConfig.borrowHref+iid;
    // }
    // //getInvestTransferContract
    // public getInvestTransferContract(iid:string):string{
    //     //noinspection TypeScriptUnresolvedVariable
    //     return this.config.appConfig.transferHref+iid;
    // }


    // public showRepaymentPlan(recordId:string, title:string){
    //     jQuery('#loanPlanModal').modal('show');
    //     this.selectInfo.title = title;
    //     this.investRecordService.repaymentParametersStream.next({
    //         name:'recordId',
    //         value:recordId
    //     });
    // }

    public goToDetail(id){

        this.router.navigate(['/invest/detail/'+id])
    }




}
