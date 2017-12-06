import { Component } from '@angular/core';

import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';

@Component({
    templateUrl:'../../views/my/modify-deal-pwd.component.html',
    styles:[require('../../views/my/modify-deal-pwd.component.less')]
})

export class SSModifyDealPwdComponent{
    private switch:number = 0;

    private oldPassword:any;

    private newPassword:any;

    private confirmPassword:any;

    private newPasswordTip:any;

    private oldPasswordTip:any

    constructor(private accountService:AccountService){
    }

    public newPasswordCheck(v:any){
        this.newPassword = v;
        if (!/^[a-zA-Z\d]{6,16}$/.test(v) && v && v.length>0) {
            this.newPasswordTip = '密码为6-16位数字或英文字母';
        } else if(v != this.confirmPassword && this.confirmPassword && this.confirmPassword.length>0) {
            this.newPasswordTip = '确认密码输入不一致';
        }else{
            this.newPasswordTip = null;
        }
    }

    public confirmPasswordCheck(v:any){
        this.confirmPassword = v;
        if(v != this.newPassword && this.newPassword && this.newPassword.length>0) {
            this.newPasswordTip = '确认密码输入不一致';
        }else{
            this.newPasswordTip = null;
        }
    }

    public btnInvalid(){

        return !!
            (!/^[a-zA-Z\d]{6,16}$/.test(this.newPassword) ||
            this.newPassword != this.confirmPassword
            || !this.oldPassword || this.oldPassword.length==0) ;
    }

    public changePassword(){
        this.accountService.changePassword(this.oldPassword, this.newPassword).then(res=>{
            this.switch=1;
        },err=>{
            this.oldPasswordTip = '';
            this.newPasswordTip = '';
            switch(err.code){
                case 135379 :
                    this.oldPasswordTip = err.text;
                    break;
                case 135377:
                    this.oldPasswordTip = '原密码错误，至少包含6位';
                    break;
                default :
                    this.newPasswordTip = err.text;
                    break;
            }
        });
    }
}