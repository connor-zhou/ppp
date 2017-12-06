import { Component } from '@angular/core';

import {AccountService} from "../../services/Account.service";
import {Router} from "@angular/router";
import {Base64} from "../../services/Base64.service";
import {CommonService} from "../../services/Common.service";
import {Config} from "../../services/Config.service";
import {BfService} from "../../services/Bf.service";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl:'../../views/my/safetySetting.component.html',
    styles:[require('../../views/my/safety-setting.component.less')]
})

export class SSIndexComponent{
    private switch:number = 0;
    private stepNo : number = -1;

    public userInfo = {
        nickname:'',
        isOpenBf:0,
        mobile:'',
        email:'',
        newEmail:'',
        realPhone:'',
    };

    public securitySetting = {
        escrowAccount:false,
        realName:false,
        mobile:false,
        email:false,
        pwd:false,
        bankCard:false,
        securityLevel:0,
        securityLevelName:''
    };


    private loginPassword:any = {
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        newPasswordTip:'',
        oldPasswordTip:'',
        confirmPasswordTip:'',
    };

    public smsCodeInfo:any = {
        text:'点击发送',
        maxRemainTime:60,
        remainTime:0,
        uniqueId:''
    };

    public tip:any = {
        imageCode:'',
        smsCode:'',
        email:'',
        emailCode:''
    };


    public data:any = {
        step:1,
        imageCode:'',
        smsCode:'',
        email:'',
        emailCode:''
    };
    private imgCodeUrl:any;

    private isTrue:boolean;

    private isTrueEmail:boolean;

    private dataRes:any = {
        maps:'',
        keys:[]
    };


    private successUrl:any;
    private actionUrl:any;
    private isChangePwd:boolean = true;

    constructor(private accountService:AccountService,
                private router:Router,
                private Base64:Base64,
                private Common:CommonService,
                private Config:Config,
                private bfService:BfService,
                private Tip:TipService
    ){
        this.stepNo = -1;
        this.refreshUserInfo();

        // accountService.refreshAccountInfo().then(res=>{
        //     this.userInfo.isOpenMmm = true;
        // },err=>{
        //     this.userInfo.isOpenMmm = false;
        // });

        this.getBankCardList();
        this.getSettingInfo();
        this.getImageCode();

    }

    // goNextStep(){
    //     this.stepNo++;
    //     if(this.stepNo > 4){
    //         this.stepNo = 1;
    //     }
    // }

    public refreshUserInfo(force?:boolean):void{
        this.accountService.refreshAccountInfo().then(res=> {
            this.userInfo.email = res.email;
            this.userInfo.nickname = res.nickname;
            this.userInfo.mobile = res.mobile;
            this.userInfo.realPhone = res.mobile;
        },err=>{});
    }


    private getSettingInfo():void{
        this.accountService.refreshAccountInfo().then(res=>{
            if(res.isOpenBf == 1){
                this.securitySetting.escrowAccount = true;
            }

            this.securitySetting.realName = !!res.realName;
            this.securitySetting.mobile = !!res.mobile;
            this.securitySetting.email = !!res.email;
            this.securitySetting.pwd = !!res.pwd;
            this.securitySetting.securityLevel = res.securityLevel;
            this.securitySetting.securityLevelName = res.securityLevelName;
        },err=>{});
    }


    public getBankCardList(){
        this.accountService.getBankCardList().then(res=>{
            if(res.id){
                this.securitySetting.bankCard = true;
            }
        },err=>{

        });
    }

    private setSwitch(n:number){
        this.switch = n;
    }

    /*
     *修改交易密码
     */

    private toRequestUrl(){
        // this.router.navigate(['/my/platform'], {queryParams: {type:'tradePassword'}});
        this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/safetySetting/username');
        this.bfService.toTradePassword(this.successUrl).then(res=>{

            this.dataRes.maps = res.maps;
            this.dataRes.keys = Object.keys(res.maps);
            this.actionUrl = res.url;
            let timer = window.setTimeout(()=>{
                jQuery("#request-form").submit();
                window.clearTimeout(timer);
            },0);
        },err=>{
            this.back('/my/safetySetting/username');
            if(err.text){
                this.Tip.show(err.text);
            }

        });
    }

    public back(url:string){
        let timer = window.setTimeout(() => {
            this.router.navigate([url]);
            window.clearTimeout(timer);
        },2000);

    }


    /*
    *修改登录密码
    * @login
     */
    public newPasswordCheck(v:any){
        this.loginPassword.newPassword = v;
        if (!/^[a-zA-Z\d]{8,15}$/.test(v) && v && v.length>0) {
            this.loginPassword.newPasswordTip = '密码为8-15位数字或英文字母';
            return false
        } else if(v != this.loginPassword.confirmPassword && this.loginPassword.confirmPassword && this.loginPassword.confirmPassword.length>0) {
            this.loginPassword.newPasswordTip = '确认密码输入不一致';
            return false
        }else{
            this.loginPassword.newPasswordTip = null;
        }
    }

    public confirmPasswordCheck(v:any){
        this.loginPassword.confirmPassword = v;
        if(v != this.loginPassword.newPassword && this.loginPassword.newPassword && this.loginPassword.newPassword.length>0) {
            this.loginPassword.newPasswordTip = '确认密码输入不一致';
            return false
        }else{
            this.loginPassword.newPasswordTip = null;
        }
    }

    public checkPwd(){
        if(this.Common.isEmpty(this.loginPassword.oldPassword)){
            this.loginPassword.oldPasswordTip = '旧密码不能为空';
            return false
        }
        if(this.Common.isEmpty(this.loginPassword.newPassword)){
            this.loginPassword.newPasswordTip = '新密码不能为空';
            return false
        }
        if(!/^[a-zA-Z\d]{8,15}$/.test(this.loginPassword.newPassword)){
            this.loginPassword.newPasswordTip = '密码为8-15位数字或英文字母';
            return false
        }
        if(this.loginPassword.newPassword != this.loginPassword.confirmPassword){
            this.loginPassword.newPasswordTip = '确认密码不一致';
            return false
        }
        return true
    }

    public alterPassword(){
        this.isChangePwd = false;
        if(!this.checkPwd()){
            this.isChangePwd = true;
            return;
        }
        let data = {
            pwd:this.Base64.encode(this.loginPassword.oldPassword),
            pwdNew:this.Base64.encode(this.loginPassword.newPassword),
            pwdNewAgain:this.Base64.encode(this.loginPassword.confirmPassword)
        };
        this.accountService.alterPassword(data).then(
            res => {
                this.isChangePwd = true;
                this.switch = 2;
            },err => {
                this.isChangePwd = true;
                this.loginPassword.oldPasswordTip = '';
                this.loginPassword.newPasswordTip = '';
                switch(err.code){
                    case 40000 :
                        this.loginPassword.oldPasswordTip = err.text;
                        break;
                    // case 40000:
                    //     this.loginPassword.oldPasswordTip = '原密码错误，至少包含6位';
                    //     break;
                    default :
                        this.loginPassword.newPasswordTip = err.text;
                        break;
                }
            }
        )
    }

    public btnInvalid(){

        return !!
            (!/^[a-zA-Z\d]{8,15}$/.test(this.loginPassword.newPassword) ||
            this.loginPassword.newPassword != this.loginPassword.confirmPassword
            || !this.loginPassword.oldPassword || this.loginPassword.oldPassword.length==0) ;
    }

    public changePassword(){
        this.accountService.changePassword(this.loginPassword.oldPassword, this.loginPassword.newPassword).then(res=>{
            this.switch=1;
        },err=>{
            this.loginPassword.oldPasswordTip = '';
            this.loginPassword.newPasswordTip = '';
            switch(err.code){
                case 135379 :
                    this.loginPassword.oldPasswordTip = err.text;
                    break;
                case 135377:
                    this.loginPassword.oldPasswordTip = '原密码错误，至少包含6位';
                    break;
                default :
                    this.loginPassword.newPasswordTip = err.text;
                    break;
            }
        });
    }

    //清除提示
    private clearTip(num){
        if(num == 1){
            this.loginPassword.oldPasswordTip = "";
        }
        if(num == 2){
            this.loginPassword.newPasswordTip = "";
        }
    }


    /*
    *绑定邮箱
     */
    private getImageCode(){
        if(this.smsCodeInfo.remainTime > 0){
            this.setTip('imageCode','请等待验证码发送');
            return
        }
        let data = this.Common.getImageCode();
        this.imgCodeUrl = data.imgUrl;
        this.smsCodeInfo.uniqueId = data.uniqueId;
    }

    private sendSmsCode():any{
        this.clearEmailTip('imageCode');
        this.clearEmailTip('smsCode');
        if(this.smsCodeInfo.remainTime > 0) return;
        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图片验证码不能为空');
            return
        }
        this.userInfo.mobile = '';
        this.Common.sendSmsCode(this.userInfo.mobile,this.data.imageCode,this.smsCodeInfo.uniqueId , 0 , 3 ).then(
            res => {
                this.Common.countDown().subscribe(s =>{
                    this.smsCodeInfo.remainTime = s;
                    if(this.smsCodeInfo.remainTime > 0){
                        this.smsCodeInfo.text = this.smsCodeInfo.remainTime + 's后重发'
                    }else{
                        this.smsCodeInfo.text = "点击发送";
                    }
                });

            },
            err =>{
                if(err.text){
                    this.setTip('imageCode',err.text);
                }

            }
        )

    }



    goStepTwo(){
        this.isTrue = true;
        if(!this.data.smsCode || !this.data.email || !this.isEmail(this.data.email) ){
            if(!this.data.smsCode){
                this.setTip('smsCode', '验证码不能为空');
                this.isTrue = false;
            }else if(!this.data.email){
                this.setTip('email', '邮箱不能为空');
                this.isTrue = false;
            }else if(!this.isEmail(this.data.email)){
                this.setTip('email', '请输入正确的邮箱');
                this.isTrue = false;
            }
        }else{


            this.accountService.alterEmail(this.data).then(res=>{
                this.stepNo++;
                this.clearAllTip();

            },err=>{
                if(err.text){
                    this.setTip('smsCode',err.text);
                    this.isTrue = false;
                }
                // if(err.code == 135875 || err.code == 135876 ){
                //     this.tip.email = err.text;
                // }else if(err.code == 135873){
                //     this.tip.smsCode = err.text;
                // }
            });
        }
    }

    goStepThree(){
        this.isTrueEmail = true;
        this.data.step = 2;
        let input ={
            emailCode:this.data.emailCode,
            step:this.data.step
        };
        this.accountService.alterEmail(input).then(res=>{
            this.stepNo++;
        },err=>{
            if(err.text){
                // this.Tip.show(err.text);
                // this.setTip('emailCode',err.text);

                console.log(err.text);
                this.isTrueEmail = false;
                this.tip.emailCode = err.text;
            }

        });
    }



    public checkImgCode(){
        this.clearTip('imageCode');
        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图形验证码不能为空');
            return false
        }
        return true
    }





    clearAllTip(){
        this.tip = {
            imageCode:'',
            smsCode:'',
            email:'',
            emailCode:''
        };
    }



    // 验证码检查
    public checkSmsCode(){
        if(this.Common.isEmpty(this.data.smsCode)){
            this.setTip('smsCode','验证码不能为空');
            return false
        }
        return true
    }

    public checkEmail(){
        if(this.Common.isEmpty(this.data.smsCode)){
            this.setTip('email','邮箱不能为空');
            return false
        }
        return true
    }

    public isEmail(str){
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(!reg.test(str)){
            return false;
        }
        return true;
    }

    // 清除错误提示
    private  clearEmailTip(type:string){

        if(type == 'imageCode'){
            this.tip.imageCode = '';
        }else if(type == 'smsCode'){
            this.tip.smsCode = '';
        }else if(type == 'email'){
            this.tip.email = '';
        }
    }

    // 设置错误提示
    private  setTip(type:string,str:string){
        if(type == 'imageCode'){
            this.tip.imageCode = str
        }else if(type == 'smsCode'){
            this.tip.smsCode = str
        }else if(type == 'email'){
            this.tip.email = str
        }
    }

}
