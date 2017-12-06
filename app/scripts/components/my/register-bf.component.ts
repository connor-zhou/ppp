/**
 * Created by guimin on 2017/9/25.
 */
import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CommonService} from "../../services/Common.service";
import {AccountService} from "../../services/Account.service";
import {TipService} from "../../services/Tip.service";
import {Base64} from "../../services/Base64.service";
import {BfService} from "../../services/Bf.service";
import {Config} from "../../services/Config.service";




@Component({
    templateUrl:'../../views/my/register-bf.component.html',
    styles:[require('../../views/my/register-bf.component.less')]
})

export class RegisterBfComponent {

    private userInfo:any = {
        realname:'',
        chinaId:'',
        isOpenBf:'',
        isActivate:false,
        oldSystemMoney:0
    };
    private errTip:any = {
        realnameTip:'',
        chinaIdTip:''
    };

    private dataRes:any = {
        maps:'',
        keys:[]
    };


    private successUrl:any;
    private actionUrl:any;
    private isTo:boolean = true;


    constructor(
        private router:Router,
        private Common:CommonService,
        private accountService:AccountService,
        private Tip:TipService,
        private Base64:Base64,
        private bfService:BfService,
        private Config:Config,
    ){

        this.accountService.getAccountInfo().then(res=>{
            this.userInfo.isOpenBf = res.isOpenBf;

            this.userInfo.isActivate = res.isActivate == 1 ? true:false;

            if(this.userInfo.isActivate){
                jQuery('#warning-activate').modal('show');
                return
            }

            // 直接连接地址进来
            if(this.userInfo.isOpenBf == 1){
                this.Tip.show('已经开通了宝付');
                this.router.navigate(['/my/overview']);
            }


        },err=>{

        });

    }



    private toRequestUrl(){
        this.isTo = false;
        if(!this.checkUser() || !this.checkId()) {
            this.isTo = true;
            return;
        }
        // this.router.navigate(['/my/platform'], {queryParams: {realname: this.userInfo.realname,chinaId:this.userInfo.chinaId, type:'registerBf'}});
        this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/recharge');
        this.bfService.toRegisterBf(this.userInfo.realname,this.userInfo.chinaId,this.successUrl, false).then(
            res => {
                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);

                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);

                this.isTo = true;
                // location.href = this.actionUrl;
                // console.log(this.actionUrl);
                // console.log(this.actionUrl = 'http://192.168.1.86:8082/api/baofu/callback/callback?certSerial=1&platformNo=8155104903&serviceName=PERSONAL_REGISTER&signature=29d815f6714db25ef8613626ea60dafb690bcafe41ce7ed2e07dff07a8cb6c718e57d1a071d45266464a2a613fa10fa52d6eabe0d638ab135db9edd311d7de6c07a77fb1a0b35817b0daf3c5483616c02f385037ec1d87d8c1f0a18b2a5f69aeab75a745ed3c433b14953dc62449ef390ea5ee913938358c992f8618254417ca&userDevice=PC');
                // jQuery("#mmm-form-recharge").submit();


            },err =>{

                this.isTo = true;
                if(err.text){

                    this.Tip.show(err.text);
                }
            }
        )
    }


    public checkUser(){
        this.clearTip('realname');
        if(this.Common.isEmpty(this.userInfo.realname)){
            this.setTip('realname','姓名不能为空');
            return false
        }
        return true
    }

    public checkId(){
        this.clearTip('chinaId');
        if(!this.Common.isChinaId(this.userInfo.chinaId)){
            this.setTip('chinaId','请输入18位有效身份证号');
            return false
        }
        return true
    }

    private  setTip(type:string,str:string){
        if(type == 'realname'){
            this.errTip.realnameTip = str
        }else if(type == 'chinaId'){
            this.errTip.chinaIdTip = str
        }
    }

    private  clearTip(type:string){
        if(type == 'realname'){
            this.errTip.realnameTip =''
        }else if(type == 'chinaId'){
            this.errTip.chinaIdTip = ''
        }
    }
}