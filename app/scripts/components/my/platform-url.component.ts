import { Component,OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MmmService} from "../../services/Mmm.service";
import {Base64} from "../../services/Base64.service";
import {Config} from "../../services/Config.service";
import {BfService} from "../../services/Bf.service";
import {TipService} from "../../services/Tip.service";

@Component({
    templateUrl:'../../views/my/platform-url.component.html',
    styles:[require('../../views/my/platform-url.component.less')]
})

export class PlatformUrlComponent {

    private recharge:any = {
        money:'',
        method:'',
    };
    private withdraw:any = {
        money:'',
        cardId:'',
        isUseTicket:''
    };
    private bank:any = {

    };
    private registerBf:any = {
        realname:'',
        chinaId:'',
    };

    private dataRes:any = {
        maps:'',
        keys:[]
    };


    private successUrl:any;
    private actionUrl:any;
    private switchType:any = '';

    constructor(
        private route:ActivatedRoute,
        private mmmService:MmmService,
        private Base64:Base64,
        private Config:Config,
        private router:Router,
        private bfService:BfService,
        private Tip:TipService
    ){

        this.route.queryParams.subscribe(
            data => {

                if(data['type'] == 'registerBf'){
                    this.registerBf = {
                        realname:data['realname'],
                        chinaId:data['chinaId'],
                    };
                    this.requestUrl('registerBf');

                    this.switchType = 'registerBf';
                }
                if(data['type'] == 'bank'){
                    this.requestUrl('bank');
                    this.switchType = 'bank';
                }
                if(data['type'] == 'recharge'){
                    this.recharge = {
                        money:data['money'],
                        method:data['method']
                    };
                    this.requestUrl('recharge');
                    this.switchType = 'recharge';

                }
                if(data['type'] == 'withdraw'){
                    this.withdraw = {
                        money:data['money'],
                        cardId:data['cardId'],
                        isUseTicket:data['isUseTicket']
                    };
                    this.requestUrl('withdraw');

                    this.switchType = 'withdraw';
                }

                if(data['type'] == 'tradePassword'){

                    this.requestUrl('tradePassword');
                }


                if(data['type'] == 'activate'){

                    this.requestUrl('activate');
                }

            }
        )
    }

    public requestUrl(way:any){
        //宝付注册
        if(way == 'registerBf'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/recharge');
            this.bfService.toRegisterBf(this.registerBf.realname,this.registerBf.chinaId,this.successUrl, false).then(
                res => {
                    this.dataRes.maps = res.maps;
                    this.dataRes.keys = Object.keys(res.maps);

                    this.actionUrl = res.url;
                    let timer = window.setTimeout(()=>{
                        jQuery("#request-form").submit();
                        window.clearTimeout(timer);
                    },0);
                    // location.href = this.actionUrl;
                    // console.log(this.actionUrl);
                    // console.log(this.actionUrl = 'http://192.168.1.86:8082/api/baofu/callback/callback?certSerial=1&platformNo=8155104903&serviceName=PERSONAL_REGISTER&signature=29d815f6714db25ef8613626ea60dafb690bcafe41ce7ed2e07dff07a8cb6c718e57d1a071d45266464a2a613fa10fa52d6eabe0d638ab135db9edd311d7de6c07a77fb1a0b35817b0daf3c5483616c02f385037ec1d87d8c1f0a18b2a5f69aeab75a745ed3c433b14953dc62449ef390ea5ee913938358c992f8618254417ca&userDevice=PC');
                    // jQuery("#mmm-form-recharge").submit();


                },err =>{
                    this.back('/my/recharge');
                    if(err.text){

                        this.Tip.show(err.text);
                    }
                }
            )
        }
        //绑定银行卡
        if(way == 'bank'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/bank');
            this.bfService.toBindBankcard(this.successUrl).then(res=>{

                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);
                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);

            },err=>{
                this.back('/my/bank');
                if(err.text){
                    this.Tip.show(err.text);
                }

            });
        }
        //解绑银行卡
        // if(way == 'unbindBank'){
        //     this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/bank');
        //     this.bfService.unbindBankcard(this.successUrl).then(res=>{
        //         this.actionUrl = res.url;
        //         this.dataRes.maps = res.maps;
        //         this.dataRes.keys = Object.keys(res.maps);
        //
        //         console.log(this.dataRes);
        //         let timer = window.setTimeout(()=>{
        //             jQuery("#request-form").submit();
        //             window.clearTimeout(timer);
        //         },0);
        //
        //     },err=>{
        //
        //     });
        // }

        //充值
        if(way == 'recharge'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/fund');
            this.bfService.toRecharge(this.recharge.money , this.recharge.method, this.successUrl, false).then(res=>{
                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);
                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);
            },err=>{
                this.back('/my/fund');
                if(err.text){
                    this.Tip.show(err.text);
                }

            });
        }
        //提现
        if(way == 'withdraw'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/fund');
            this.bfService.toWithdraw(this.withdraw.money, this.successUrl,this.withdraw.cardId, this.withdraw.isUseTicket, false).then(res=>{

                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);
                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);
            },err=>{
                this.back('/my/fund');
                if(err.text){
                    this.Tip.show(err.text);
                }

            });
        }
        //修改交易密码
        if(way == 'tradePassword'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/safetySetting/username');
            this.bfService.toTradePassword(this.successUrl).then(res=>{

                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);
                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);
            },err=>{
                this.back('/my/safetySetting/username');
                if(err.text){
                    this.Tip.show(err.text);
                }

            });
        }

        // 激活
        if(way == 'activate'){
            this.successUrl = this.Base64.encode(this.Config.appConfig.appRootUrl+'/my/registerBf');
            let data = {callback:this.successUrl};

            this.bfService.toActivate(data).then(res=>{

                this.dataRes.maps = res.maps;
                this.dataRes.keys = Object.keys(res.maps);
                this.actionUrl = res.url;
                let timer = window.setTimeout(()=>{
                    jQuery("#request-form").submit();
                    window.clearTimeout(timer);
                },0);
            },err=>{
                this.back('/my/registerBf');
                if(err.text){
                    this.Tip.show(err.text);
                }

            });
        }

    }


    public back(url:string){
        let timer = window.setTimeout(() => {
            this.router.navigate([url]);
            window.clearTimeout(timer);
        },2000);

    }


}