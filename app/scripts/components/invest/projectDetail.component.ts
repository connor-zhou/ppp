import { Component,OnInit } from '@angular/core';
import {ProjectService} from "../../services/Project.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AccountService} from "../../services/Account.service";
import {ProjectModel} from "../../models/project.model";
import {Subject} from "rxjs/Subject";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    templateUrl:"../../views/invest/detail.component.html",
    styles:[require('../../views/invest/detail.component.less')]
})

export class ProjectDetailComponent {

    private projectId:string;

    private project:any = new ProjectModel();

    public profit:string = '0';

    // 输入相关
    public data:any = {
        money:'',
        errText:'',
        switch:0
    };

    // 用户当前行为
    public action:any = {
        text:'',
        url:''
    };

    // 账户数据
    private accountInfo:any ={
        money:4545,
        isOpenBf:1,
        hasLogin:false
    };

    public calcProfit$ = new Subject<string>();

    // 整个其它信息
    public appendix:any  = {
        type:0,
        investRecords:{
            count:1,
            lists:[]
        },
        projectInfo:{
            name:'',
            application:'',
            address:'',
            chinaId:'',
            company:'',
            instruction:''
        },
        files:{
            photos:[]
        },
        riskInfo:'',
        bigPic:''
    };

    public investRecords:any ={
        count:1,
        lists:[]
    };

    public file:any;
    constructor(
        private Project:ProjectService,
        private route: ActivatedRoute,
        private Account: AccountService,
        private Router:Router,
        private sanitizer: DomSanitizer
    ){

        this.accountInfo.hasLogin = this.Account.hasLogin();
        this.route.params.subscribe(val =>{
            if(val['id'])this.projectId = val['id'];
            this.switchMode(0);
            this.getProjectInfo();
            if(this.accountInfo.hasLogin){
                this.getAccountInfo();
            }
        });

        this.calcProfit$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => this.calcProfit())
            .subscribe(results => {});

    }


    // 去投资
    public goInvest(){

        if(!this.getUserActon()){
            this.Router.navigate([this.action.url]);
            return;
        }

        if(!this.checkMoney()) return false;
        this.Router.navigate(['/invest/confirm/'+this.projectId+'/'+this.data.money])
    }


    // 检查输入金额的合法性
    private checkMoney(){
        this.data.errText = '';

        let money = this.data.money ? parseInt(this.data.money) : 0;
        if(this.project.remainInvest <= this.project.minInvest && money < this.project.remainInvest){
            this.data.money = this.project.remainInvest;
            return true;
        }
        // 不输入时不应该再判断
        if(!money)return false;


        // 可融资金额不小于起投金额时，判断金额的合理区间
        if(this.project.remainInvest >= this.project.minInvest && (money < this.project.minInvest || money > (this.project.remainInvest < this.project.maxInvest ? this.project.remainInvest:this.project.maxInvest)) ){
            this.data.errText = '投资金额不能小于起投金额，大于最大可投金额';
            return false
        }

        // 可融资金额小于起投金额时，判断金额的合理区间
        if(this.project.remainInvest < this.project.minInvest && money != this.project.remainInvest){
            this.data.errText = '可融资金额小于起投金额时，只能投资当前剩余可投金额';
            return false
        }


        // 投资金额的倍数
        // if (money % this.project.minInvest != 0){
        //     this.data.errText = '投资金额必须是'+this.project.minInvest+'的倍数';
        //     return false
        // }
        return true;
    }


    // 用户现在的行为（需要登录、开通宝付、充值、投资）,true 默认用户可以操作投资。
    public getUserActon(){
        let money = this.data.money ? parseInt(this.data.money) : 0;
        if(!this.Account.hasLogin()){
            this.action.text = '登录';
            this.action.url='/sign/login';
            return false;
        }else if(this.accountInfo.isOpenBf == 0){
            this.action.text = '开通宝付';
            this.action.url='/my/registerBf';
            return false;
        }else if(money > this.accountInfo.money){
            this.action.text = (money - this.accountInfo.money)+'.00元';
            this.action.url='/my/recharge';
            return false
        }
        return true;

    }

    // 计算收益
    public calcProfit(){
        this.data.money = this.data.money+''.replace(/\D/g,'');
        this.checkMoney();
        this.Project.profitCalculation(this.projectId,this.data.money).then(res => {
            this.profit = res.profit;}, err => {
            this.profit = '0.00'
        })
    }



    public switchMode(n:number){
        this.data.switch = n;
        if(n == 0){ this.getAppendix(); }
        if(n == 3 && this.accountInfo.hasLogin){ this.getInvestRecords();}
    }

    // 得到投资记录
    public getInvestRecords(){
        this.Project.getInvestmentRecords(1,10,this.projectId).then(res =>{
            this.appendix.investRecords.count = res.count;
            this.appendix.investRecords.lists = res.recordList;}, err =>{
            this.appendix.investRecords.count = 0;
            this.appendix.investRecords.lists = [];
            }
        )
    }


    private getAccountInfo(){
        this.Account.refreshAccountInfo(1).then(res => {
                this.accountInfo.isOpenBf = res.isOpenBf;
                this.accountInfo.money = res.money;},err => {}
        )
    }


    private getProjectInfo(){
        this.Project.detail(this.projectId).then(res => {
                this.project = new ProjectModel(res);
                // 当融资金额小于起投金额时，投资金额只能投剩余最大可投金额。
                if(this.project.maxInvest < this.project.minInvest){
                   this.data.money = this.project.maxInvest+'';
                   this.calcProfit();
                }
                if(this.project.remainInvest <= this.project.minInvest){
                    this.data.money = this.project.remainInvest;
                    console.log(this.project.remainInvest)
                    this.calcProfit();
                }
            }, err => {
        })
    }

    // 项目信息，风控信息
    private getAppendix(){
        this.Project.getAppendix(this.projectId).then(res => {

            this.appendix.type = res.type;
            this.appendix.projectInfo.name = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.name);
            this.appendix.projectInfo.application = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.application);
            this.appendix.projectInfo.address = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.address);
            this.appendix.projectInfo.chinaId = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.chinaId);
            this.appendix.projectInfo.company = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.company);
            this.appendix.projectInfo.instruction = this.sanitizer.bypassSecurityTrustHtml(res.projectInfo.instruction);
            this.appendix.files.photos = res.files.photos;
            this.file = this.appendix.files.photos[0];
            this.appendix.riskInfo = this.sanitizer.bypassSecurityTrustHtml(res.riskInfo);
            // this.appendix.riskInfo =res.riskInfo;
        }, err => {})
    }


    private getFile(e:any){
        this.file = e;
    }

}
