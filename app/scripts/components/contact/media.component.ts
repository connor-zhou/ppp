import { Component,Pipe, PipeTransform  } from '@angular/core';
import { Router } from '@angular/router';

import {MessageService} from '../../services/Message.service';
import { CommonService } from '../../services/Common.service';
import {PlatformService} from "../../services/Platform.server";



@Component({
    templateUrl:"../../views/contact/mediaReport.component.html",
    styles: [require("../../views/contact/media-report.component.less")]
})

export class ContactMediaComponent{

    private pageNumber:number = 1;

    public prevPageEnable:boolean = false;
    public nextPageEnable:boolean = false;

    private articleList:any[] = [];

    public type:number;

    public queryParam:any = {
        pageSize:6,
        pageNumber:1,
        type:0
    };

    public totalPage:any;
    constructor(private Router:Router,
                private Message:MessageService,
                private Common:CommonService,
                private Platform:PlatformService
    ){
        this.type = MessageService.ARTICLE_TYPE_NEWS;
        this.totalPage = 1;
        this.pullArticleList();
    }

    private set(value:any,num:any){
        if(num == 1){
            let yyyy = value.substr(0, 4);
            return yyyy;

        }
        if(num == 2){
            let MM = value.substr(5, 2);
            return MM;
        }
        if(num == 3){
            let dd = value.substr(8, 2);
            return dd;

        }
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

    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.pullArticleList();
    }

    subString(str:string){
        let len = 125;
        if(str && typeof str == 'string' && str.length > len){
            return str.substr(0,len)+'...';
        }
        return str

    }
}
