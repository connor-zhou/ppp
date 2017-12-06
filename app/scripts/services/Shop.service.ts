/**
 * Created by guimin on 2017/10/11.
 */
import { Injectable } from '@angular/core';
import {CustomHttp} from "./customHttp.service";
import {Config} from "./Config.service";
import {Base64} from "./Base64.service";

@Injectable()
export class ShopService {
    constructor(
        private http:CustomHttp,
        private config:Config,
        private Base64:Base64
    ){

    }


    /**
     * 优惠券列表
     */
    getCouponList(data:any){
        return this.http.post(this.config.apiPath.mall.couponList,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     *
     * 用户星币兑换记录
     */
    getExchangeRecords(data:any){
        return this.http.post(this.config.apiPath.mall.exchangeRecords,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }
    /**
     *
     * wow我的用户星币兑换记录
     */
    getMyExchangeRecords(data:any){
        return this.http.post(this.config.apiPath.mall.myExchangeRecords,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     *
     * 星币兑换详细
     */
    getMyLogs(data:any){
        return this.http.post(this.config.apiPath.mall.myLogs,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     *
     * 商品详情
     */
    getCouponDetail(id:any){
        return this.http.post(this.config.apiPath.mall.couponDetail,{productId:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }

    /**
     *
     * 确认兑换
     */
    change(id:any,num:number){
        return this.http.post(this.config.apiPath.mall.change,{productId:id,num:num})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                }
            )
    }


}
