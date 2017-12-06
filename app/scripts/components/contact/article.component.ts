/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,OnInit,OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { GlobalEventsManager } from '../../services/GlobalEventManager.service';
import {MessageService} from '../../services/Message.service';
import {PlatformService} from "../../services/Platform.server";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
    templateUrl: '../../views/contact/article.component.html',
    styles: [require("../../views/contact/article.component.less")]
})
export class ArticleComponent implements OnInit{

    private article:any = {
        title:'',
        timeline:'',
        html:''
    };
    private articleData:any = {
        type:'',
        newsId:''
    };

    constructor(private globalEventsManager: GlobalEventsManager,
                private Message:MessageService,
                private route:ActivatedRoute,
                private Location:Location,
                private Platform:PlatformService,
                private DomSanitizer:DomSanitizer
    ){
    }

    ngOnInit(){
        this.route.params.forEach(params=>{
            // this.globalEventsManager.articleTypeChange.emit(parseInt(params['industryData.type']));

            this.Platform.getNewsDetail(params['type'],params['id']).then(
                res => {
                    this.article = res;
                    if(res.html){
                        this.article.html = this.DomSanitizer.bypassSecurityTrustHtml(res.html);
                    }


                },err => {
                    this.article = '';
                }
            )



            // console.log(params['article.id'])
            // this.articleData.type = params['type'];
            // this.articleData.newsId = params['article.id'];
            //
            // if(this.articleData.type != '' && this.articleData.newsId != ''){
            //     this.getDetail();
            // }


        });

        // this.route.queryParams.subscribe(
        //     data => {
        //         this.articleData.type = data['type'];
        //         this.articleData.newsId = data['id'];
        //         this.getDetail();
        //     }
        // )
    }

    private getLocalTime(tm){
        let d = new Date(tm);
        // var date = (d.getFullYear()) + "-" +
        //     (d.getMonth() + 1) + "-" +
        //     (d.getDate()) + " " +
        //     (d.getHours()) + ":" +
        //     (d.getMinutes()) + ":" +
        //     (d.getSeconds());

        let yy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mi = d.getMinutes();
        let sc = d.getSeconds();

        let se;
        if(sc < 10){
            se = "0" + sc;
        }else {
            se = sc;
        }


        let time = yy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + se;
        return time;
    }

    // private getDetail(){
    //     this.Platform.getNewsDetail(this.articleData).then(
    //         res => {
    //             this.article = res;
    //             console.log(res);
    //         },err => {
    //             this.article = '';
    //         }
    //     )
    // }

    // back(){
    //     this.Location.back();
    // }
    //
    // ngOnDestroy(){
    //     this.globalEventsManager.articleTypeChange.emit(-1);
    // }

}