import {Component, NgZone} from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {Router} from "@angular/router";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";


@Component({
    templateUrl:'../../views/my/person-info.component.html',
    styles:[require("../../views/my/person-info.component.less")]
})


export class PersonInfoComponent{
    private switch:number = 1;
    private stepNo : number;

    private newUname:string;

    private setUnameErr = false;

    private setUnameErrMsg='';

    public userInfo = {
        nickname:'',
        realname:'',
        avatar:'',
        mobile:false,
        chinaId:'',
        isOpenBf:'',
        isRiskAssess:'',
        riskAssessResult:'',
    };

    public securitySetting = {
        nickname:false,
        isOpenBf:false,
        realname:false,
        mobile:false,
        chinaId:false,
        isRiskAssess:false,
    };

    private imgData:any={
        data:'',
        type:''
    };
    private selectedImg:string;

    constructor(
        private accountService:AccountService,
        private router:Router,
        private zone:NgZone,
        private globalEventManager:GlobalEventsManager,
    ){
        this.stepNo = 1;
        this.refreshUserInfo();
        // this.getSettingInfo();

    }





    goNextStep(){
        this.stepNo++;
        if(this.stepNo > 4){
            this.stepNo = 1;
        }
    }

    public refreshUserInfo(force?:boolean):void{
        this.accountService.refreshAccountInfo().then(res=> {
            this.userInfo.nickname = res.nickname;
            this.userInfo.realname = res.realname;
            this.userInfo.mobile = res.mobile;
            this.userInfo.avatar = res.avatar;
            this.userInfo.chinaId = res.chinaId;
            this.userInfo.isRiskAssess = res.isRiskAssess;
            this.userInfo.isOpenBf = res.isOpenBf;
            this.userInfo.riskAssessResult = res.riskAssessResult;

            this.securitySetting.nickname = !!res.nickname;
            this.securitySetting.isOpenBf = !!res.isOpenBf;
            this.securitySetting.realname = !!res.realname;
            this.securitySetting.mobile = !!res.mobile;
            this.securitySetting.isRiskAssess = !!res.isRiskAssess;
            this.securitySetting.chinaId = !!res.chinaId;
        },err=>{});
    }

    public saveNickname():void{
        this.setUnameErr = false;
        if(this.newUname){
            this.accountService.saveNickname(this.newUname).then(res=>{
                this.userInfo.nickname = this.newUname;
                this.switch=1;
                this.globalEventManager.alterNicknameSuccess.emit(true);
                this.securitySetting.nickname = true;
            },err=>{
                this.setUnameErr = true;
                if(err.code == 135506){
                    this.setUnameErrMsg = '*'+'用户名必须为3-20位字母、数字或汉字'
                }else{
                    this.setUnameErrMsg = err.text? '*'+err.text:'*更新用户错误';
                }
            });
        }else{
            this.setUnameErr = true;
            this.setUnameErrMsg = '*'+'用户名不能为空'
        }
    }

    //取消昵称修改
    private clearNick(n:any){
        this.switch = n;
        this.setUnameErr = false;
        this.setUnameErrMsg = '';
        this.newUname = '';
    }

    //聚焦输入框
    private clearErr(){
        this.setUnameErr = false;
    }

    private getSettingInfo():void{
        this.accountService.refreshAccountInfo().then(res=>{
            this.securitySetting.nickname = !!res.nickname;
            this.securitySetting.isOpenBf = !!res.isOpenBf;
            this.securitySetting.realname = !!res.realname;
            this.securitySetting.mobile = !!res.mobile;
            this.securitySetting.isRiskAssess = !!res.isRiskAssess;
            this.securitySetting.chinaId = !!res.chinaId;

        },err=>{});
    }

    private toRequestUrl(){
        this.router.navigate(['/my/platform'], {queryParams: {type:'tradePassword'}});
    }

    private changeHeadImage(){

    }

    public getFile(file:any){

        if (/image\/\w+/.test(file[0].type)){
            this.readFile(file[0].type,file[0]);
        }else{
            alert('只能选择图片')
        }
    }

    private readFile(type:any,file:any){
        let self = this;
        self.imgData.type = type.substring(6);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            self.imgData.data = reader.result.split(',')[1];

                self.accountService.alterAvatar(self.imgData.data).then(
                    res => {
                        self.accountService.refreshAccountInfo().then(
                            res => {
                                self.selectedImg =  res.avatar;
                                // self.tip.show('头像修改成功！',3000);
                                self.zone.run(() => {})
                            },
                            err =>{
                                if(err.text){
                                    // console.log(err.text);
                                }

                            }
                        )
                    },
                    err => {
                        if(err.text){
                            // console.log(err.text);
                        }
                    }
                )
        }
    }
}