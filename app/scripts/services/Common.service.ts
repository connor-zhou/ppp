/**
 * Created by LLL on 2016/9/27.
 */
import {Injectable} from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import  {Config} from './Config.service';
import  {CustomHttp} from './customHttp.service'
import {LocalStrorageService} from "./LocalStrorageService.service";
import {Base64} from "./Base64.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CommonService {

    constructor(private route: ActivatedRoute,
                 private http: CustomHttp,
                private config: Config,
                private Base64: Base64,
                private LocalStrorage: LocalStrorageService) {
        this.route.url.map(res=>{
            console.log(res);
        });
        if(this.getUrlQuerParam('ad')){
            this.setChannel(this.getUrlQuerParam('ad'));
        }
        if(this.getUrlQuerParam('channel')){
            this.setChannel(this.getUrlQuerParam('channel'));
        }
        if(this.getUrlQuerParam('m')){
            this.setInviteMobile(this.getUrlQuerParam('m'));
        }
        if(this.getUrlQuerParam('inviteMobile')){
            this.setInviteMobile(this.getUrlQuerParam('inviteMobile'));
        }
    }

    public getUrlQuerParam(n:any):any{
        var b = new RegExp("[?&]"+n+"=([^&#]*)").exec(window.location.href);
        if(b==null){
            return null
        }else{
            console.log(b);
            return b[1]||null;
        }
    };


    /**
     * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
     * 联通号码段:130、131、132、136、185、186、145
     * 电信号码段:133、153、180、189
     *
     * 手机号验证
     * @param mobile
     * @returns {boolean}
     */

    public isMobile(mobile: string):boolean {

        return /^1[34578]\d{9}$/.test(mobile);

    }


    /**
     * 密码验证:8-15位大小写字母和数字（任意两种组合）
     * @param pwd
     * @returns {boolean}
     */

    public isPassword(pwd: string):boolean {

        return /[0-9]+/.test(pwd) && /[a-zA-Z]+/.test(pwd) && /^[a-zA-Z0-9]{8,15}$/.test(pwd);
    }


    /**
     * 基本数据类型空值验证
     *
     * 字符串形式的 "undefined" 和 "null" 返回true， 引用类型object,function等返回false，空格返回true
     * @param str
     * @returns {boolean}
     */

    public isEmpty(str: string|undefined|null):boolean {

        if(str == undefined || str == null)return true;

        if(typeof str == 'string'){

            // 避免全是空格
            let s = str.trim();
            if(!s || s == 'undefined' || s == 'null') return true
        }

        return false

    }


    /**
     * 检查身份证号
     *
     * 18位数字或17位数字加一个字母
     *
     * @param chinaId
     * @returns {boolean}
     */

    public isChinaId(chinaId: string):boolean {

        let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(chinaId);
    }



    /**
     * 生成全局唯一标识符
     * @returns {boolean}
     */

    public guid():string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    /**
     * 60秒倒计时
     * @returns {Subject}
     *
     * @example
     *
     * Common.countDown().subscribe( val => {})
     *
     */

    public countDown(time?:number):Subject<any>{

        let t = time || 60;

        let countDown$ = new Subject<any>();

        let remainTime:any = t;
        let timer = window.setInterval(()=>{
            if(remainTime <= 0){
                remainTime = t;
                window.clearInterval(timer);
                return
            }
            remainTime--;
            countDown$.next(remainTime);
        },1000);

        return countDown$;

    }


    /**
     * 银行列表
     * @returns {Promise<TResult>}
     */
    public getBankList(): Promise<any> {
        return this.http.post(this.config.apiPath.common.bankList)
            .then(
                res => {
                    return res;
                }, error => {
                    return Promise.reject(error);
                });
    }

    /**
     * 省份
     * @returns {Promise<TResult>}
     */
    public getProvinceList(): Promise<any> {
        return this.http.post(this.config.apiPath.common.provinceList)
            .then(
                res => {
                    return res;
                }, error => {
                    return Promise.reject(error);
                });
    }

    /**
     * 城市
     * @returns {Promise<TResult>}
     */
    public getCityList(provinceCode: any): Promise<any> {
        return this.http.post(this.config.apiPath.common.cityList, {provinceCode: provinceCode})
            .then(
                res => {
                    return res;
                }, error => {
                    return Promise.reject(error);
                });
    }


    public setChannel(channel) {
        this.LocalStrorage.set('common.channel', channel);
    }

    public getChannel(): string {
        return this.LocalStrorage.get('common.channel');
    }

    /**
     * @description
     * 获取推荐人加密手机号码
     */
    public getInviteMobile() {
        return this.LocalStrorage.get('common.m');
    }

    /**
     * @description
     * 获取解码推荐人手机号码
     */
    public getDecodeInviteMobile() {
        var m = this.getInviteMobile();
        if (m) return this.Base64.decode(m);
        return m;
    }

    /**
     * @description
     * 设置加密手机号码
     */
    public setInviteMobile(m) {
        this.LocalStrorage.set('common.m', m);
    }

    /**
     * 获取BBS登录URL
     * @param url
     * @returns {Promise<void>|Promise<TResult>}
     */
    public getBBSLoginUrl(url:any = null){
        if(!url){
            url = 'http://platform.xingtouzi.com'
        }
        return this.http.post(this.config.apiPath.common.getBBSLoginUrl,{url:url}).then(function(res){
            return res;
        },function(err){
            return Promise.reject(err);
        });
    }

    /**
     * 格式化时间
     * @param source
     * @returns {Date}
     */
    public getValidDate(source:string){
        let a = source.split(/[^0-9]/);
        let y:any,m:any,d:any,h:any=0,j:any=0,s:any=0;
        for(var i=0;i<a.length;i++){
            switch (i){
                case 0:
                    y=a[i];
                    break;
                case 1:
                    m=a[i];
                    break;
                case 2:
                    d=a[i];
                    break;
                case 3:
                    h=a[i];
                    break;
                case 4:
                    j=a[i];
                    break;
                case 4:
                    s=a[i];
                    break;
            }
        }
        return new Date(y,m-1,d,h,j,s);
    }

    /**
     * 获取图形验证码
     * @returns {Promise<any>}
     */
    public getImageCode(){
        let client = {
            type: 'website',
            version:this.config.appConfig.version,
            website:{
                ua:window.navigator.userAgent
            },
            language:'zh'
        };

        let data = {
            imgUrl:'',
            uniqueId:''
        };


        data.uniqueId = this.guid();
        data.imgUrl = this.config.apiPrefix + '/common/imageCode?client=' + this.Base64.encode(JSON.stringify(client)) + '&uniqueId='+ data.uniqueId;

        return data;

    }


    /**
     * 获取短信验证码
     * @returns {Promise<any>}
     */
    sendSmsCode(mobile: string,imgCode:string,time:any, status:number , serviceType:number) {

        return this.http.post(this.config.apiPath.common.sendSmsCode, {mobile: mobile,imageCode:imgCode,uniqueId:time, status:status, serviceType:serviceType})
            .then(
                res => {
                    return res;
                },
                error => {
                    return Promise.reject(error);
                }
            )
    }


    // 用户是否注册过
    isRegistered(mobile: string): any {
        return this.http.post(this.config.apiPath.common.isRegistered, {mobile: mobile})
            .then(
                res => {
                    return res;
                }, error => {
                    return Promise.reject(error);
                })
    }

}