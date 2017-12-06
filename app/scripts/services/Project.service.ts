/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';
import  { Config } from './Config.service';
import  { CustomHttp } from './customHttp.service'

@Injectable()
export class ProjectService {

    constructor(private http: CustomHttp, private config: Config) { }

    recommend(){
        return this.http.post(this.config.apiPath.project.recommend)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    noviceProject(){
        return this.http.post(this.config.apiPath.project.newerProject)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    // 项目分页列表
    pageList(
        pageSize:number,
        pageNumber:number,
        category:string,
        period:number,
        sort?:string
    ){

        let data = {
            pageSize:pageSize,
            pageNumber:pageNumber,
            category:category,
            period:period
        };

        if(sort)data['sort']= sort;

        return this.http.post(this.config.apiPath.project.pageList,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


    // 项目详情
    detail(id:string){
        return this.http.post(this.config.apiPath.project.detail,{projectId:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    // 计算收益
    profitCalculation(id:string,money:string){
        return this.http.post(this.config.apiPath.project.profitCalculation,{projectId:id,money:money})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    // 投资记录
    getInvestmentRecords(pageNumber:number,pageSize:number,id:string){
        return this.http.post(this.config.apiPath.project.investmentRecords,{
            pageNumber:pageNumber,
            pageSize:pageSize,
            projectId:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


    // 得到指定项目的其它信息
    getAppendix(id:string){
        return this.http.post(this.config.apiPath.project.appendix,{
            projectId:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


    // 贷后披露
    getExecutionInfo(id:string){
        return this.http.post(this.config.apiPath.project.executionInfo,{
            projectId:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    // 息咨询服务协议
    agreementConsult(id:string,money:string){
        return this.http.post(this.config.apiPath.project.agreementConsult,{
            projectId:id,
            money:money
        }).then(res => {
                    return res;
                },error => {
                    return Promise.reject(error);
       } )
    }



}