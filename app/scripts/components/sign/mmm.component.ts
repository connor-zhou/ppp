/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import { MmmService } from '../../services/Mmm.service'
import { Config } from "../../services/Config.service";
import  { Base64 } from '../../services/Base64.service';
import {ActivatedRoute,Params} from "@angular/router";

@Component({
    selector:'mmm',
    templateUrl: '../../views/sign/mmm.component.html',
    styles:[require("../../views/sign/mmm.component.less")]
})
export class MmmComponent {
    private realName:string;
    private chinaId:string;
    private  urlSucc:string ;
    private  urlFail:string;
    private  tip:string;
    constructor(private Mmm:MmmService,
                private Base64:Base64,
                private config:Config,
                private route:ActivatedRoute
    ){
        this.realName = '';
        this.chinaId = '';
        this.tip = '';



        this.urlSucc = this.Base64.encode(this.config.appConfig.appRootUrl+'/my');
        this.urlFail = this.Base64.encode(this.config.appConfig.appRootUrl+'/sign/mmm');

        this.route.params.forEach((params: Params) => {
            if(params['backUrl']){
                this.urlSucc = params['backUrl'];
            }
        })

    }

    openMmm(){
        if(this.realName && this.chinaId){
            this.Mmm.toRegister(this.realName,this.chinaId,this.urlSucc,this.urlFail, false).then(
                res => {this.tip= '';window.location.href = res.url},
                err => {
                    if(err.code == 159778){
                        this.tip = '身份证号码格式不正确'
                    }else{
                        this.tip = err.text;
                    }
                }
            )
        }else{
            this.tip = '姓名或者身份证号不能为空！'
        }
    }
}

