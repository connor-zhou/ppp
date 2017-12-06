import { Component } from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl:'../../views/help/riskAssess.component.html',
    styles:[require('../../views/help/riskAssess.component.less')]
})

export class RiskAssessComponent{

    public questionList:any = [];
    public result:string;
    public data:any = [];
    public flag:boolean = false;
    public errText:string = '';
    constructor(
        private Account:AccountService,
        private Tip:TipService
    ){
        this.Account.riskAssessList().then(res=>{
            this.questionList = res;
        },err=>{
            this.questionList = [];
        });

    }


    public select(qid:string,aid:string){

        this.data.forEach((val,key)=>{
            if(val && qid == val.split(';')[0]){
                this.data.splice(key,1);
                return
            }
        });
        this.data.push(qid+';'+aid);

    }


    public submit(){
        this.result = this.errText = '';

        // 提交过不能再提交（未刷新之前）
        if(this.flag) {
            jQuery('#riskAssess').modal('show');
            return
        }

        // 保证所有的问题都回答
        if(this.data.length == 0 || this.data.length != this.questionList.length){
            jQuery('#riskAssess').modal('show');
            return
        }

         this.Account.riskAssessSubmit(this.data.join(',')).then(res=>{
             this.flag = true;
             this.result = res.result;
             jQuery('#riskAssess').modal('show');
         },err=>{
             if(err.text){
                 this.errText = err.text;
                 jQuery('#riskAssess').modal('show');
             }
         })
    }
}
