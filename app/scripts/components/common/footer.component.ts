/**
 * Created by leiliang on 2016/10/11.
 */
import { Component,Input,OnInit } from '@angular/core';
import { CommonService } from '../../services/Common.service'
import {Config} from "../../services/Config.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";
@Component({
    selector:'xtz-footer',
    templateUrl:'../../views/common/footer.component.html',
    styles:[require('../../views/common/footer.component.less')]
})

export class FooterComponent implements OnInit{

    hideNavbar:boolean = false;

    private links : any[] = [];

    private bbsUrl:string = 'http://www.xingtouzi.com/platform/login?url=http://platform.xingtouzi.com';

    constructor(
        private Common:CommonService,
        private Config:Config,
        private globalEventsManager:GlobalEventsManager
    ){

        globalEventsManager.hideNavbar.subscribe((mode)=> {
            this.hideNavbar = mode;
        });

    }

    ngOnInit(){
        this.links =[
            {title: "星投资", link: "http://www.xingtouzi.com/"},
            {title: "星湖投资", link: "http://www.asterlake.cn"},
            {title: "网贷之家", link: "http://www.wangdaizhijia.com/"},
            {title: "网贷天眼", link: "http://www.p2peye.com"},
            {title: "网贷指南", link: "http://www.wangdaizhinan.com/"},
            {title: "网贷帮", link: "http://www.wangdaibang.com"},
            {title: "网贷百科", link: "http://www.wangdaibaike.com"},
            {title: "网贷百科", link: "http://www.wangdaibaike.com"},
            {title: "网贷中心", link: "http://www.wdzx.com/"},
            {title: "网贷堂", link: "http://www.wangdaitang.com"}
        ]
    }
}
