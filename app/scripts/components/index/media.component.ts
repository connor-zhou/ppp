import { Component } from '@angular/core';
import { MessageService } from '../../services/Message.service'
import { CommonService } from '../../services/Common.service';

@Component({
    selector:'media',
    templateUrl:'../../views/index/media.component.html',
    styles: [require("../../views/index/media.component.less")]
})

export class MediaComponent{

    private articleList : any[] = [];

    constructor(private Message:MessageService, private Common:CommonService){
        let pageSize = 4;
        this.Message.getArticleList(pageSize, 1, MessageService.ARTICLE_TYPE_NEWS).then(res=>{

            if(res.recordList){
                res.recordList.forEach(val=>{
                    if(val.intro.length >= 37){
                        val.intro = val.intro.substr(0,37)+'...';
                    }
                })
            }

            this.articleList = res.recordList;
            // this.articleList.forEach(article=>{
            //     article['date'] = this.Common.getValidDate(article.timeline);
            // });
        },err=>{
            this.articleList = [];
        });
    }
}
