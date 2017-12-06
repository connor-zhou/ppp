/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';
import  { Config } from './Config.service';
import  { CommonService } from './Common.service';
import  { CustomHttp } from './customHttp.service'

@Injectable()
export class MessageService {




    /**
     * 媒体报道
     * @type {number}
     */
    public static ARTICLE_TYPE_NEWS = 0;



    /**
     * 系统公告
     * @type {number}
     */
    public static ARTICLE_TYPE_SYSTEM = 2;

    /**
     * 行业动态
     * @type {number}
     */
    public static ARTICLE_TYPE_INDUSTRY = 1;



    /**
     * 公司动态
     * @type {number}
     */
    public static ARTICLE_TYPE_DYNAMIC = 3;

    constructor(private http: CustomHttp, private config: Config, private Common: CommonService) { }

    /**
     * 获取系统文章
     * @param pageSize
     * @param pageNumber
     * @param type
     * @returns {Promise<TResult>}
     */
    getArticleList(pageSize:number, pageNumber:number, type:number){
        return this.http.post(this.config.apiPath.platform.newsPageList,
            {pageSize:pageSize, pageNumber:pageNumber,type:type})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     * 文章详情
     * @param articleId
     * @param type
     * @returns {Promise<TResult>}
     */
    getArticleDetail(articleId:any, type:any){
        return this.http.post(this.config.apiPath.message.systemMessageDetail,
            {msgsId:articleId, type:type})
            .then(
                res => {
                    res['date'] = this.Common.getValidDate(res['timeline']);
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    getAccountMessageBrief():Promise<any>{
        return this.http.post(this.config.apiPath.message.accountMessageInfo,{type:0,status:0})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    /**
     * 账户消息列表
     * @param articleId
     * @param type
     * @returns {Promise<TResult>}
     */
    getMyMessage(data:any){
        return this.http.post(this.config.apiPath.message.myMessagePageList,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     * 账户消息详情
     * @param articleId
     * @param type
     * @returns {Promise<TResult>}
     */
    getMyMessageDetail(msgId:any){
        return this.http.post(this.config.apiPath.message.myMessageDetail,{msgId:msgId})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     * 账户消息标记已读
     * @param articleId
     * @param type
     * @returns {Promise<TResult>}
     */
    setMarkRead(msgIds:any[]){
        return this.http.post(this.config.apiPath.message.myMarkRead,{msgIds:msgIds.join(',')})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

}