/**
 * Created by leiliang on 2016/10/11.
 */
import { Component,OnInit,Input,EventEmitter } from '@angular/core';
import  { Config } from '../../services/Config.service'
import {AccountService} from "../../services/Account.service";
import {Base64} from "../../services/Base64.service";
import '../../../images/share/share.jpg';

@Component({
    selector:'share',
    templateUrl:'../../views/common/share.component.html',
    styles:[require('../../views/common/share.component.less')]
})

export class ShareComponent implements OnInit{

    private rootUrl:string;

    private config ={
        text:"快来和我一起轻松理财",
        desc:'星投资注册就送899元现金红包，新手专享年化百分之12高收益，如此绝佳理财良机我们不能错过~',
        link:'/sign/register',
        url:null,
        pic:null
    };

    private sites = ['qq','sina','qqzone'];

    private shareUrls = [];

    constructor(private Config:Config,private Account:AccountService,private Base64:Base64){
        this.rootUrl = this.Config.appConfig.appRootUrl;
        this.config.desc = encodeURI(this.config.desc);
    }

     ngOnInit(){
         this.configParam();
     }

     public copy(){
         window.prompt("请复制下面的地址到浏览器中打开",decodeURIComponent(this.config.url))
     }


     private configParam(){

         let params = ['ad=pcB47h1df5e6axkrnc032XnPvgblyfeIrt'];
         this.config.url = this.rootUrl + this.config.link;

         if (this.Account.hasLogin()) {
             this.Account.refreshAccountInfo().then(res =>{
                 params.push('m=' + this.Base64.encode(res.realPhone));
                 let connect = this.config.url.lastIndexOf('?') == -1 ? '?' : '&';
                 this.config.url = encodeURIComponent(this.config.url + connect + params.join('&'));

                 this.config.pic = this.rootUrl + jQuery('#shareImg').attr('src');

                 for(let key of  this.sites){
                     this.shareUrls.push(this.getConfigUrl(key));
                 }
             },err=>{});
         }


     }

     private getConfigUrl(category:string){
        switch(category){
            case 'qq':
                return "http://connect.qq.com/widget/shareqq/index.html?title="+this.config.text+"&url="+this.config.url+"&desc="+this.config.desc+"&pics="+this.config.pic;
            case 'qqzone':
                return "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="+this.config.text+"&url="+this.config.url+"&summary="+this.config.desc+"&pics="+this.config.pic;
            case 'sina':
                return "http://service.weibo.com/share/share.php?title="+this.config.text+"&url="+this.config.url+"&pic="+this.config.pic;
        }
     }
}