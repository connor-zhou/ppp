/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';
import  { Config } from './Config.service';
import  { CustomHttp } from './customHttp.service'

@Injectable()
export class HelpService {

    constructor(private http: CustomHttp, private config: Config) { }

    /**
     * 问题类型
     * @returns {Promise<TResult>}
     */
    getQuestionCategory(){
        return this.http.post(this.config.apiPath.help.questionCategory)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     * 问题列表
     * @returns {Promise<TResult>}
     */
    getQuestionList(category:any){
        return this.http.post(this.config.apiPath.help.questionList,{
            category:category
        })
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     * 搜索问题
     * @returns {Promise<TResult>}
     */
    searchQuestionList(keywords:any){
        return this.http.post(this.config.apiPath.help.search,{
            keywords:keywords
        })
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     * 问题答案
     * @returns {Promise<TResult>}
     */
    getAnswer(id:any){
        return this.http.post(this.config.apiPath.help.answerDetail,{
            id:id
        })
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }
}