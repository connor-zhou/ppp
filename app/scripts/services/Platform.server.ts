/**
 * Created by guimin on 2017/10/11.
 */
import { Injectable } from '@angular/core';
import {CustomHttp} from "./customHttp.service";
import {Config} from "./Config.service";
import {Base64} from "./Base64.service";

@Injectable()
export class PlatformService {
    constructor(
        private http:CustomHttp,
        private config:Config,
        private Base64:Base64
    ){

    }

    //新闻列表
    getNewsList(dataAll:any){
        let client = {
            type: 'website',
            version:this.config.appConfig.version,
            website:{
                ua:window.navigator.userAgent
            },
            language:'zh'
        };
        let data = {
            client:this.Base64.encode(JSON.stringify(client)),
            type:dataAll.type,
            pageNumber:dataAll.pageNumber,
            pageSize:dataAll.pageSize
        };
        return this.http.post(this.config.apiPath.platform.newsPageList,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    //新闻详情
    getNewsDetail(type:any,newsId:any){
        let client = {
            type: 'website',
            version:this.config.appConfig.version,
            website:{
                ua:window.navigator.userAgent
            },
            language:'zh'
        };
        let data = {
            client:this.Base64.encode(JSON.stringify(client)),
            type:type,
            newsId:newsId
        };
        return this.http.post(this.config.apiPath.platform.newsDetail,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    //星投资平台累计成交数据
    getdealData(){
        return this.http.post(this.config.apiPath.platform.dealData)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


    //信息披露
    getInfo(){
        return this.http.post(this.config.apiPath.platform.info)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }
}