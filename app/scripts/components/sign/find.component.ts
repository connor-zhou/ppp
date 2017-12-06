/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import {CommonService} from "../../services/Common.service";
import {AccountService} from "../../services/Account.service";
import {Router} from "@angular/router";
import {Base64} from "../../services/Base64.service";
import {TipService} from "../../services/Tip.service";


@Component({
    templateUrl: '../../views/sign/findPwds.component.html',
    styles:[require('../../views/sign/find-password.component.less')]
})
export class FindComponent {

     public tip:any = {
        mobile:'',
        pwd:'',
        imageCode:'',
        smsCode:'',
        pwdAgain:''
    };

    public data:any = {
        mobile:'',
        imageCode:'',
        smsCode:'',
        pwd:'',
        pwdAgain:''
    };

    public smsCodeInfo:any = {
        text:'点击发送',
        maxRemainTime:60,
        remainTime:0,
        uniqueId:''
    };

    private isLogin : boolean = false;

    private imgCodeUrl:string = '';

    private stepNo : number = 1;

    private timeCount:number = 5;

    constructor(
        private Common:CommonService,
        private Account:AccountService,
        private Router:Router,
        private Base64:Base64,
        private Tip:TipService
    ){}


    public getImageCode(){

        this.clearTip('imageCode');
        this.clearTip('smsCode');

        if(this.smsCodeInfo.remainTime > 0)return;

        let data = this.Common.getImageCode();
        this.imgCodeUrl = data.imgUrl;
        this.smsCodeInfo.uniqueId = data.uniqueId;


        // this.smsCodeInfo.uniqueId = this.Common.guid();
        // this.Account.getMsgVerifyCode(this.smsCodeInfo.uniqueId).then(
        //     res => {
        //         this.imgCodeUrl = res.photo;
        //     },
        //     err => {
        //         if(err.text){
        //             this.setTip('imageCode',err.text);
        //         }
        //     }
        // )
    }


    public sendSmsCode():any{

        if(this.smsCodeInfo.remainTime > 0) return;

        if(!this.checkMobile())return;

        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图片验证码不能为空');
            return
        }

        this.Common.sendSmsCode(this.data.mobile,this.data.imageCode,this.smsCodeInfo.uniqueId , 1 , 0).then(
            res => {
                this.clearTip('imagesCode');

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



        // this.Account.sendImgSmsCode(this.data.mobile,this.data.imageCode,this.smsCodeInfo.uniqueId ).then(
        //     res => {
        //         this.clearTip('imagesCode');
        //
        //         this.Common.countDown().subscribe(s =>{
        //             this.smsCodeInfo.remainTime = s;
        //             if(this.smsCodeInfo.remainTime > 0){
        //                 this.smsCodeInfo.text = this.smsCodeInfo.remainTime + 's后重发'
        //             }else{
        //                 this.smsCodeInfo.text = "点击发送";
        //             }
        //         });
        //
        //
        //     },
        //     err =>{
        //         if(err.text){
        //             this.setTip('imageCode',err.text);
        //         }
        //
        //     }
        // )

    }

    public switchStep(n:number){

        if(n == 2){
            if(!this.checkMobile())return;
            if(!this.checkRegister())return;

            this.Common.isRegistered(this.data.mobile).then(res=>{
                // console.log(res.result);
                if(res.result){
                    this.getImageCode();
                    this.stepNo = n;
                }else {
                    this.setTip('mobile','手机号码未注册');
                    return
                }

            },err=>{});

        }

        if(n == 3){
            let max = this.timeCount;
            this.Common.countDown(max).subscribe(s =>{
                if(s <= 0){
                    this.Router.navigate(['/invest/overall'])
                }
                this.timeCount  = s;
            })
            this.stepNo = n;
        }


    }


    public resetPassword(){
        if(!this.checkLegal())return;

        let input:any = {
            mobile:this.data.mobile,
            smsCode:this.data.smsCode,
            pwdNew:this.Base64.encode(this.data.pwd),
            pwdNewAgain:this.Base64.encode(this.data.pwdAgain)
        };

        this.isLogin = true;

        this.Account.resetPassword(input).then(res=>{
            this.switchStep(3);
            this.isLogin = false;
        },err=>{
            this.isLogin = false;
            if(err.text){
                this.Tip.show(err.text);
            }
        })
    }

    private checkLegal(){

        return this.checkMobile()
            && this.checkSmsCode()
            && this.checkPassword()
            && this.checkPasswordAgain()
    }

    // 密码检查
    public checkMobile(){
        this.clearTip('mobile');
        if(this.Common.isEmpty(this.data.mobile)){
            this.setTip('mobile','手机号码不能为空');
            return false
        }

        if(!this.Common.isMobile(this.data.mobile)){
            this.setTip('mobile','手机号码不合法');
            return false
        }

        return true
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

    // 确认密码检查
    public  checkPasswordAgain(){
        this.clearTip('pwdAgain');
        if(this.Common.isEmpty(this.data.pwdAgain)){
            this.setTip('pwdAgain','重复密码不能为空');
            return false
        }
        if(this.data.pwdAgain != this.data.pwd){
            this.setTip('pwdAgain','两次密码输入不一致');
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

    // 清除错误提示
    private  clearTip(type?:string){
        if(type == 'mobile'){
            this.tip.mobile =''
        }else if(type == 'pwd'){
            this.tip.pwd = ''
        }else if(type == 'imageCode'){
            this.tip.imageCode = ''
        }else if(type == 'smsCode'){
            this.tip.smsCode = ''
        }else if(type == 'pwdAgain'){
            this.tip.pwdAgain = ''
        }else{
            this.tip.mobile
                = this.tip.pwd
                = this.tip.imageCode
                = this.tip.smsCode
                = this.tip.pwdAgain
                = ''
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
        }else if(type == 'pwdAgain'){
            this.tip.pwdAgain = str
        }
    }

    public checkRegister(){

        return this.Common.isRegistered(this.data.mobile).then(res=>{
            // console.log(res.result);
            if(res.result){
                return true
            }else {
                this.setTip('mobile','手机号码未注册');
                return false
            }

        },err=>{});
    }

}

