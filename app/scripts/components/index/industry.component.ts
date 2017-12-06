import { Component } from '@angular/core';
import { MessageService } from '../../services/Message.service';
import { CommonService } from '../../services/Common.service';

@Component({
    selector:'industry',
    templateUrl:'../../views/index/industry.component.html',
    styles:[require('../../views/index/industry.component.less')]
})

export class IndustryComponent{

    private articleList : any[];

    constructor(private Message:MessageService, private Common:CommonService){
        let pageSize = 4;
        this.Message.getArticleList(pageSize, 1, MessageService.ARTICLE_TYPE_INDUSTRY).then(res=>{
            this.articleList = res;
            this.articleList.forEach(article=>{
                article['date'] = this.Common.getValidDate(article.timeline);
            });
        },err=>{
            this.articleList = [];
        });
    }
}
