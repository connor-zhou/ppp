import { Component } from '@angular/core';

import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';

@Component({
    templateUrl:'../../views/my/modifyPhone.component.html',
    styles:[require('../../views/my/modify-phone.component.less')]
})

export class SSModifyPhoneComponent{
    private switch:number = 0;

    private stepNo : number = 1;

    private smsCodeTip;

    private oldSmsCode;

    private newSmsCode;

    private newPhoneTip;

    private newPhone;

    private userInfo = {
        realPhone:'',
        phone:''
    };

    private     imgCodeNum:string;
    private     imgCodeTip:string;
    private     imgCodeUrl:any;
    private     dateTime:any;


    constructor(private accountService:AccountService,private commonService:CommonService){
        this.accountService.refreshAccountInfo().then(res=>{
            this.userInfo.realPhone = res.realPhone;
            this.userInfo.phone = res.phone;
        },err=>{});

        this.imgCodeNum = '';
        this.imgCodeTip = "";
        this.getMsgVerifyCode();
    }

    private getMsgVerifyCode(){
        this.imgCodeNum = '';
        this.imgCodeTip = "";
        this.dateTime = new Date().getTime();
        this.accountService.getMsgVerifyCode(this.dateTime).then(
            res => {
                this.imgCodeUrl = res.photo;
            },
            err => {
                // if(err.code = '135905'){
                //     this.imgCodeTip = err.text;
                // }
                if(err.text){
                    this.imgCodeTip = err.text;
                }
            }
        )
    }

    private  maxRemainTime = 60;
    private  smsText = '获取短信验证码';
    private  remainTime = 0;
    private sendSmsCode(phone:any):any{
        if(this.remainTime > 0) return;
        if(!this.imgCodeNum){
            this.imgCodeTip = '图片验证码不能为空';
            return
        }
        // this.commonService.isMobile(phone).then(
        //     res => {
        //         this.accountService.sendImgSmsCode(phone,this.imgCodeNum,this.dateTime).then(
        //             res => {
        //                 this.remainTime = this.maxRemainTime;
        //                 let smsTimer = setInterval(() =>{
        //                     this.remainTime --;
        //                     this.smsText = this.remainTime + '秒后重发';
        //                     if (this.remainTime <= 0) {
        //                         this.remainTime = 0;
        //                         this.smsText = "获取短信验证码";
        //                         //noinspection TypeScriptUnresolvedFunction
        //                         clearInterval(smsTimer);
        //                     }
        //                 },1000)
        //                 this.imgCodeTip = '';
        //             },
        //             err => {
        //                 if(err.text){
        //                     this.imgCodeTip = err.text
        //                 }
        //
        //             }
        //         )
        //     },
        //     error => {
        //         if(error.text){
        //             this.smsCodeTip = error.text
        //         }
        //     }
        // )
    }

    goStepTwo(){
        this.newPhoneTip = this.smsCodeTip = null;
        if(!this.oldSmsCode){
            this.smsCodeTip = '验证码不能为空'
        }else if(!this.newPhone){
            this.newPhoneTip = '手机号不能为空'
        }else{
            this.accountService.verifyIdentityToBindPhone(this.newPhone, this.oldSmsCode,0).then(res=>{
                this.stepNo++;
                this.maxRemainTime = 60;
                this.smsText = '获取短信验证码';
                this.remainTime = 0;
                // this.sendSmsCode(this.newPhone);
                this.getMsgVerifyCode();
                this.imgCodeNum = '';
                this.imgCodeTip = "";
            },err=>{
                if(err.code == 135844 || err.code == 135843){
                    this.newPhoneTip = err.text;
                }else{
                    this.smsCodeTip = err.text;
                }
                switch(err.code){
                    case 135844 :
                        this.newPhoneTip = '请输入正确的手机号码';
                        break;
                    case 135843 :
                        this.newPhoneTip = '手机号已注册';
                        break;
                    case 135841:
                        this.smsCodeTip = '验证码错误';
                        break;
                    default :
                        this.smsCodeTip = err.text;
                        break;
                }
            });
        }
    }

    goStepThree(){
        this.newPhoneTip = this.smsCodeTip = null;
        if(!this.newSmsCode){
            this.smsCodeTip = '验证码不能为空';
            return;
        }
        this.accountService.modifyBindPhone(this.newPhone, this.newSmsCode,0).then(res=>{
            this.stepNo++;
            this.maxRemainTime = 60;
            this.smsText = '获取短信验证码';
            this.remainTime = 0;
        },err=>{
            let code = parseInt(err.code);
            if(parseInt(err.code) == 0x212b3){
                this.smsCodeTip = err.text;
            }
        });
    }
}