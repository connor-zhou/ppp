/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import { AccountService } from '../../services/Account.service'
import { CommonService } from '../../services/Common.service'
import {Base64} from "../../services/Base64.service";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl: '../../views/sign/login.component.html',
    styles:[require('../../views/sign/login.component.less')]
})
export class LoginComponent {


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
        uniqueId:''
    };


    public  loginMode:number = 0;
    private isLogin : boolean = false;
    private imgCodeUrl:string;

    private loginError :boolean = false;

    constructor(
        private Account:AccountService,
        private Common:CommonService,
        private Base64:Base64,
        private Tip:TipService
    ){

        this.getImageCode();
    }




    switchMode (num){
        this.loginMode = num;

        if(this.loginMode == 1 && !this.imgCodeUrl){
            this.getImageCode();
        }

        this.clearTip();
    }


    login() {

        // 密码登录，需同意协议
        // if(this.loginMode == 0 && !this.data.agree) return;
        // 检查所有输入的合法性
        if(!this.checkLegal()) return ;
        // 设置登录中标志
        this.isLogin = true;

        let input:any;

        if(this.loginMode == 0 && this.loginError == false){
            input = {
                aname:this.data.mobile,
                password:this.Base64.encode(this.data.pwd),
                type:0
            };

        }else if(this.loginMode == 1 && !this.loginError){
            input = {
                aname:this.data.mobile,
                smsCode:this.data.smsCode,
                type:1
            };
        }else if(this.loginMode == 0 && this.loginError == true){
            input = {
                aname:this.data.mobile,
                password:this.Base64.encode(this.data.pwd),
                type:0,
                imageCode:this.data.imageCode,
                uniqueId:this.smsCodeInfo.uniqueId
            };
        }

        this.Account.login(input).then(
            res => {
                this.isLogin = false;
            },
            err => {
                this.isLogin = false;
                if(err.text){
                    this.Tip.show(err.text)
                }
                // this.loginError = true;
                // this.getImageCode();
                if(err.code == 40200){
                    this.Tip.show(err.text);
                    //三次错误显示验证码
                    this.loginError = true;
                    // this.getImageCode();
                }
            });
    };



    public press(e){
        if(e.keyCode == 13){
            this.login();
        }
    }



    public sendSmsCode():any{

        if(this.smsCodeInfo.remainTime > 0) return;

        if(!this.checkMobile())return;

        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图片验证码不能为空');
            return
        }


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

    public getImageCode(){

        this.clearTip('imageCode');
        this.clearTip('smsCode');
        let data = this.Common.getImageCode();
        this.imgCodeUrl = data.imgUrl;
        this.smsCodeInfo.uniqueId = data.uniqueId;

        // if(this.smsCodeInfo.remainTime > 0)return;
        //
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

    private checkLegal(){

        if(this.loginMode == 0 && this.loginError == false){

            return this.checkMobile()
                && this.checkPassword()


        }else if(this.loginMode == 1 && this.loginError == false){
            return this.checkMobile()
                && this.checkSmsCode()
        }else if(this.loginMode == 0 && this.loginError == true){
            return this.checkMobile()
                && this.checkPassword()
                && this.checkImgCode()

        }

        return false


    }

    private checkImgCode(){

        if(this.Common.isEmpty(this.data.imageCode)){
            this.setTip('imageCode','图片验证码不能为空');
            return false
        }else {
            return true;
        }
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
        }else{
            this.tip.mobile
                = this.tip.pwd
                = this.tip.imageCode
                = this.tip.smsCode
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
        }
    }

    // 手机号码检查
    public checkMobile(){


        this.clearTip('mobile');

        if(this.Common.isEmpty(this.data.mobile)){
            this.setTip('mobile',this.loginMode == 0 ?'手机号码不能为空':'手机号码不能为空');
            return false
        }

        // if(this.loginMode == 1){

            if(!this.Common.isMobile(this.data.mobile)){
                this.setTip('mobile','手机号码不合法');
                return false
            }

        // }

        return true
    }

    // 密码检查
    public checkPassword(){
        this.clearTip('pwd');
        if(this.Common.isEmpty(this.data.pwd)){
            this.setTip('pwd','密码不能为空');
            return false
        }
        //
        // if(!this.Common.isPassword(this.data.pwd)){
        //     this.setTip('pwd','密码是8-15位数字和大小写字母组合');
        //     return false
        // }
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


}
