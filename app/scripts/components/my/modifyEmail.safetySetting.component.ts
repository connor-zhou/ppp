import { Component } from '@angular/core';

import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';
import {TipService} from "../../services/Tip.service";


@Component({
    templateUrl:'../../views/my/modifyEmail.component.html',
    styles:[require("../../views/my/modify-email.component.less")]
})

export class SSModifyEmailComponent{

    private switch:number = 0;

    private stepNo : number = 1;


    // private smsCodeTip;
    //
    // private smsCode;
    //
    // private emailCode;
    //
    // private emailCodeTip;

    // private newEmail;

    // private emailTip;


    private userInfo = {
        email:'',
        newEmail:'',
        realPhone:'',
        mobile:''
    };

    // private     imgCodeNum:string;
    // private     imgCodeTip:string;
    //
    // private     dateTime:any;


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
    constructor(
        private accountService:AccountService,
        private Common:CommonService,
        private Tip:TipService
    ){
        this.accountService.refreshAccountInfo().then(res=>{
            this.userInfo.realPhone = res.mobile;
            this.userInfo.mobile = res.mobile;
            this.userInfo.email = res.email;
        },err=>{});
        this.getImageCode();

    }


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
        this.accountService.alterEmail(this.data).then(res=>{
            this.stepNo++;
        },err=>{
            if(err.text){
                this.Tip.show(err.text);
                // this.setTip('emailCode',err.text);

                console.log(err.text);
                this.isTrueEmail = false;
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
    private  clearTip(type:string){

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