/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,OnInit,OnDestroy } from '@angular/core';
import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
    templateUrl: '../../views/sign/validatePhone.component.html',
    styles:[require("../../views/sign/validate-phone.component.less")]
})
export class ValidatePhoneComponent implements OnInit{
    private phone :string;
    private pwd : string;
    private remPhone:string;
    private smsCode : string;
    private remPhoneTip:string;
    private smsCodeTip:string;
    constructor(private Account:AccountService,private Common:CommonService,private router:Router,private route:ActivatedRoute){
       this.remPhone = '';
        this.smsCode = '';
    }


    ngOnInit(){
        this.route.params.forEach((params:Params) => {
            this.phone = params['phone'];
            this.pwd = params['pwd'];
        });
        this.remPhone = this.Common.getDecodeInviteMobile();

    }

    confirm(){
        // this.isMobile().then(
        // res => {
        //     this.Account.register(this.phone,this.pwd,this.smsCode,this.remPhone).then(
        //         res => {
        //             this.smsCodeTip = '';
        //             this.router.navigate(['/sign/registerSucc']);
        //         },
        //         error =>{
        //             if(error.code == 135316){
        //                 this.smsCodeTip = '验证码不能为空';
        //             }else{
        //                 this.smsCodeTip = error.text;
        //             }
        //         }
        //     )
        // },
        // error =>{
        //     console.log(error);
        // })

    }


    private  maxRemainTime = 60;
    private  smsText = '获取短信验证码';
    private  remainTime = 0;
    private sendSmsCode():any{
        if(this.remainTime > 0) return;
        // this.Common.isMobile(this.phone).then(
        //     res => {
        //         this.Account.sendSmsCode(this.phone).then(
        //             res => {
        //                 this.remainTime = this.maxRemainTime;
        //                 this.smsText = "获取短信验证码";
        //                 let smsTimer = setInterval(() =>{
        //                     this.remainTime --;
        //                     this.smsText = this.remainTime + '秒后重发';
        //                     if (this.remainTime <= 0) {
        //                         this.remainTime = 0;
        //                         this.smsText = "发送验证码";
        //                         //noinspection TypeScriptUnresolvedFunction
        //                         clearInterval(smsTimer);
        //                     }
        //                 },1000)
        //             }
        //         )
        //     },
        //     error => this.smsCodeTip = error.text
        // )
    }


    // private isMobile():any{
    //     if(this.remPhone == ''){
    //         return Promise.resolve(true)
    //     }else{
    //         // return this.Common.isMobile(this.remPhone).then(
    //         //     res => {
    //         //         this.remPhoneTip ='';
    //         //         return res;
    //         //     },
    //         //     error =>{
    //         //         this.remPhoneTip = error.text;
    //         //         Promise.reject(error);
    //         //     })
    //         // }
    // }

}

