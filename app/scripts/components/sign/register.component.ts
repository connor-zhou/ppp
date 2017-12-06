/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';
import {Base64} from "../../services/Base64.service";
import {Config} from "../../services/Config.service";
import {Router} from "@angular/router";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl: '../../views/sign/register.component.html',
    styles:[require("../../views/sign/register.component.less")]
})
export class RegisterComponent {


    public tip:any = {
        mobile:'',
        pwd:'',
        imageCode:'',
        smsCode:'',
        inviteCode:''
    };


    public data:any = {
        mobile:'',
        imageCode:'',
        smsCode:'',
        pwd:'',
        inviteCode:'',
        agree:true
    };

    public smsCodeInfo:any = {
        text:'点击发送',
        maxRemainTime:60,
        remainTime:0,
        uniqueId:'',
        isSent:true
    };

    private isLogin : boolean = false;

    private imgCodeUrl:any;

    private isRegister: boolean = false;

    constructor(

        private Account:AccountService,
        private Common:CommonService,
        private Base64:Base64,
        private Config:Config,
        private Tip:TipService
    ){

        // this.data.inviteCode = this.Common.getDecodeInviteMobile();
        this.getImageCode();
    }


    public register(){

        if(!this.data.agree) return;
        if(!this.checkMobile())return;
        if(!this.checkLegal()) return ;
        let input = {
            mobile:this.data.mobile,
            password:this.Base64.encode(this.data.pwd),
            smsCode:this.data.smsCode
        };
        if(!this.Common.isEmpty(this.data.inviteCode)){
            input['inviteMobile'] = this.data.inviteCode;
        }

        this.isLogin = true;

        this.Common.isRegistered(input.mobile).then(res=>{
            if(res.result){
                this.setTip('mobile','手机号码已注册');
                this.isLogin = false;
            }else{
                this.Account.register(input).then(
                    res =>{
                        this.isLogin = false;
                    },
                    err =>{
                        this.isLogin = false;
                        if(err.text){
                            if(err.code = 40100){
                                this.tip.smsCode = err.text;
                            }else{
                                this.Tip.show(err.text);
                            }

                        }
                    }
                )
            }
        },err=>{
            if(err.code == 40100){
                this.setTip('smsCode','短信验证码错误');
            }else if(err.text){
                this.Tip.show(err.text);
            }
            this.isLogin = false;
        });


    }


    private sendSmsCode():any{

        // console.log(this.smsCodeInfo.isSent);

        // 不能重复连续点击
        if(!this.smsCodeInfo.isSent) return;


        if(this.smsCodeInfo.remainTime > 0) return;

        if(!this.checkMobile())return;


        this.Common.isRegistered(this.data.mobile).then(res=>{
            // console.log(res.result);
            if(res.result){
                this.setTip('mobile','手机号码已注册');
                return
            }else {
                this.sendSms();
            }

        },err=>{});


        // this.smsCodeInfo.uniqueId = this.Common.guid();


    }
    private sendSms(){
        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图片验证码不能为空');
            return
        }
        this.smsCodeInfo.isSent = false;
        this.Common.sendSmsCode(this.data.mobile,this.data.imageCode,this.smsCodeInfo.uniqueId , 1 , 2 ).then(
            res => {

                this.clearTip('imagesCode');
                this.Common.countDown().subscribe(s =>{
                    this.smsCodeInfo.remainTime = s;
                    if(this.smsCodeInfo.remainTime > 0){
                        this.smsCodeInfo.isSent = true;
                        this.smsCodeInfo.text = this.smsCodeInfo.remainTime + 's后重发'
                    }else{
                        this.smsCodeInfo.text = "点击发送";
                    }
                });

            },
            err =>{
                this.smsCodeInfo.isSent = true;
                if(err.text){
                    this.setTip('imageCode',err.text);
                }

            }
        )
    }


    private getImageCode(){
        this.clearTip('imageCode');
        this.clearTip('smsCode');
        if(this.smsCodeInfo.remainTime > 0){
            // this.setTip('imageCode','请等待验证码发送');
            return
        }


        // let client = {
        //     type: 'website',
        //     version:this.Config.appConfig.version,
        //     website:{
        //         ua:window.navigator.userAgent
        //     },
        //     language:'zh'
        // };
        // this.smsCodeInfo.uniqueId = this.Common.guid();
        // this.imgCodeUrl = this.Config.apiPrefix + '/common/imageCode?client=' + this.Base64.encode(JSON.stringify(client)) + '&uniqueId='+this.smsCodeInfo.uniqueId;

        //方式二
        let data = this.Common.getImageCode();
        this.imgCodeUrl = data.imgUrl;
        this.smsCodeInfo.uniqueId = data.uniqueId;
        // console.log(this.imgCodeUrl);




        // this.Common.getMsgVerifyCode(this.smsCodeInfo.uniqueId).then(
        //     res => {
        //         // this.imgCodeUrl = res.photo;
        //         console.log(res);
        //     },
        //     err => {
        //         if(err.text){
        //             // this.setTip('imageCode',err.text);
        //         }
        //     }
        // )
    }


    private checkLegal(){

        return this.checkMobile()
                && this.checkSmsCode()
                && this.checkPassword()
                && this.checkInviteCode()
    }

    // 密码检查
    public checkMobile(){
        this.clearTip('mobile');
        if(this.Common.isEmpty(this.data.mobile)){
            this.setTip('mobile','手机号码不能为空');
            return false
        }else if(!this.Common.isMobile(this.data.mobile)){
            this.setTip('mobile','手机号码不合法');
            return false
        }else {
            return true
        }

    }
    public checkRegister(){

        return this.Common.isRegistered(this.data.mobile).then(res=>{
            // console.log(res.result);
            if(res.result){
                this.setTip('mobile','手机号码已注册');
                return false
            }else {
                return true
            }

        },err=>{});
    }

    // 密码检查
    public checkPassword(){
        this.clearTip('pwd');
        if(this.Common.isEmpty(this.data.pwd)){
            this.setTip('pwd','密码不能为空');
            return false
        }

        if(!this.Common.isPassword(this.data.pwd)){
            this.setTip('pwd','密码是8-15位数字和大小写字母组合');
            return false
        }
        return true
    }

    // 验证码检查
    public checkSmsCode(){
        this.clearTip('smsCode');
        if(this.Common.isEmpty(this.data.smsCode)){
            this.setTip('smsCode','验证码不能为空');
            return false
        }
        return true
    }

    // 邀请人检查
    public checkInviteCode(){
        this.clearTip('inviteCode');
        if(!this.Common.isEmpty(this.data.inviteCode) && !this.Common.isMobile(this.data.inviteCode)){
            this.setTip('inviteCode','邀请人手机号码不合法');
            return false
        }
        return true
    }

    // 清除错误提示
    private  clearTip(type:string){
        if(type == 'mobile'){
            this.tip.mobile =''
        }else if(type == 'pwd'){
            this.tip.pwd = ''
        }else if(type == 'imageCode'){
            this.tip.imageCode = ''
        }else if(type == 'smsCode'){
            this.tip.smsCode = ''
        }else if(type == 'inviteCode'){
            this.tip.inviteCode = ''
        }
    }

    // 设置错误提示
    private  setTip(type:string,str:string){
        if(type == 'mobile'){
            this.tip.mobile = str
        }else if(type == 'pwd'){
            this.tip.pwd = str
        }else if(type == 'imageCode'){
            this.tip.imageCode = str
        }else if(type == 'smsCode'){
            this.tip.smsCode = str
        }else if(type == 'inviteCode'){
            this.tip.inviteCode = str
        }
    }

}
