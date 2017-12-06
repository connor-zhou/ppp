import { Component, Pipe, PipeTransform  } from '@angular/core';
import { Router } from '@angular/router';

import {MessageService} from '../../services/Message.service';
import { CommonService } from '../../services/Common.service';
import {PlatformService} from "../../services/Platform.server";


@Component({
    templateUrl:"../../views/contact/latest.component.html",
    styles: [require("../../views/contact/latest.component.less")]
})

export class LatestComponent{
    private switch : number = 0;




    private pageNumber:number = 1;

    public prevPageEnable:boolean = false;
    public nextPageEnable:boolean = false;

    private articleList:any[];

    public type:number;

    public queryParam:any = {
        pageSize:10,
        pageNumber:1,
        type:2
    };

    public totalPage:any;

    private date:any;
    private abc:any;

    // private dateNowMilliseconds:any;

    constructor(private Router:Router,
                private Message:MessageService,
                private Common:CommonService,
                private Platform:PlatformService
    ){
        this.switchTab(0);
        this.totalPage = 1;
    }

    public switchTab(n:number):void{
        this.pageNumber = 1;
        this.prevPageEnable = false;
        this.nextPageEnable = false;
        this.switch = n;
        this.pullArticleList();
    }

    public pullArticleList(){
        this.Platform.getNewsList(this.queryParam).then(
            res => {
                this.articleList = res.recordList;
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
            },err => {
                this.totalPage = 0;
                this.articleList = [];
            }
        )
    }
    //
    // dateNow : Date = new Date();
    // dateNowISO = this.dateNow.toISOString();
    // dateNowMilliseconds = this.dateNow.getTime();

    // private set(){
    //     let dateNow = new Date();
    //     console.log(dateNow);
    // }
    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.pullArticleList();
    }

    // public pullArticleList(){
    //     let pageSize = 10;
    //     this.type = this.switch == 0 ? MessageService.ARTICLE_TYPE_SYSTEM : MessageService.ARTICLE_TYPE_DYNAMIC;
    //     this.Message.getArticleList(pageSize, this.pageNumber, this.type).then(res=>{
    //         this.articleList = res;
    //         this.articleList.forEach(article=>{
    //             article['date'] = this.Common.getValidDate(article.timeline);
    //         });
    //         if(res.length < pageSize){
    //             if(this.pageNumber == 1){
    //                 this.prevPageEnable = false;
    //             }
    //             this.nextPageEnable = false;
    //         }else {
    //             this.nextPageEnable = true;
    //         }
    //     },err=>{
    //         this.articleList = [];
    //     });
    // }

    public setPageNumber(n:number):void{
        if(n>0){
            this.pageNumber++;
            this.prevPageEnable = true;
        }else {
            this.pageNumber--;
            if(this.pageNumber == 1){
                this.prevPageEnable = false;
            }
        }
        this.pullArticleList();
    }
}
