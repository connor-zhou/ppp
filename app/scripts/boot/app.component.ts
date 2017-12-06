/**
 * Created by Lei liang on 2016/8/30.
 */
import {
    AfterViewChecked, AfterContentChecked, AfterContentInit, AfterViewInit, Component, ViewChild,
    OnInit
} from '@angular/core';
import  'rxjs/add/operator/toPromise';
import {
    Router, ActivatedRoute, NavigationEnd, NavigationStart, RouteConfigLoadStart,
    RouteConfigLoadEnd
} from '@angular/router';
import { Config }         from  '../services/Config.service';
import { GlobalEventsManager } from '../services/GlobalEventManager.service'
import {LocalStrorageService} from "../services/LocalStrorageService.service";
import {CommonService} from "../services/Common.service";
import {UAService} from "../services/UA.service";
import {AccountService} from "../services/Account.service";
import {MaskService} from "../services/Mask.service";

@Component({
    selector: 'xtz-app',
    templateUrl:'./app.component.html'
})

export class AppComponent implements OnInit{

    constructor(
                private globalEventsManager: GlobalEventsManager,
                private localStorage:LocalStrorageService,
                private router:Router,
                private Account:AccountService,
                private Mask:MaskService
    ) {


        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((e:any) =>{

                // 进入登陆页，发出提示token；设置页头和页尾进入时机。
                if(e.urlAfterRedirects == '/sign/login'){
                    this.globalEventsManager.goSignToken.emit('login')
                }else if(e.urlAfterRedirects == '/sign/register'){
                    this.globalEventsManager.goSignToken.emit('register')
                }else{
                    this.globalEventsManager.goSignToken.emit(false)
                }

                if(e.urlAfterRedirects && e.urlAfterRedirects.split('/')[1] == "sign"){
                    this.globalEventsManager.hideNavbar.emit(true);
                    this.globalEventsManager.hideSubNavbar.emit(false);
                }else{
                    this.globalEventsManager.hideNavbar.emit(false);
                    this.globalEventsManager.hideSubNavbar.emit(true);
                }


            });



        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((e:any) =>{

                // 保证用户登录后返回到之前的界面
                if(e.url && e.url.split('/')[1] != "sign"){
                    this.Account.redirectUrl = e.url;
                }

                // 解决切换路由后，没手动关闭modal，仍残留全局样式。
                let body = jQuery('body');
                body.removeClass('modal-open');
                body.attr('style','');

                jQuery('.modal-backdrop.fade.in').remove();


            });


        // 添加懒加载跳转提示
        this.router.events
            .filter( event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd)
            .subscribe((event)=>{
                if(event instanceof RouteConfigLoadStart ){
                    this.Mask.showSyn('跳转中')
                }else if(event instanceof RouteConfigLoadEnd){
                    this.Mask.hide();
                }
            });



    }

    ngOnInit(){
        if(!this.localStorage.get('enteredFlag')){
            this.localStorage.set('enteredFlag',true);
            this.globalEventsManager.hideModal.emit(false);
        }else{
            this.globalEventsManager.hideModal.emit(true);
        }
    }
}