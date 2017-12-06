import { Component } from '@angular/core';
import { MessageService } from '../../services/Message.service'
import { CommonService } from '../../services/Common.service'
import {Router} from "@angular/router";

@Component({
    selector:'notice',
    templateUrl:'../../views/index/notice.component.html'
})

export class NoticeComponent{

    private noticeList : any = [];

    constructor(
        private Message:MessageService,
        private Common:CommonService,
        private Router:Router
    ){
        let pageSize = 5;
        this.Message.getArticleList(pageSize, 1, MessageService.ARTICLE_TYPE_SYSTEM).then(res=>{
            if(res.recordList){
                res.recordList.forEach(val=>{
                    if(val.title.length > 20){
                        val.title = val.title.substr(0,30)+'...';
                    }
                })
            }
            this.noticeList = res.recordList;
        },err=>{
            this.noticeList = [];
        });
    }

    goNoticeDetail(e:any){
        this.Router.navigate(['/contact/article',2,e.id])
    }
}
