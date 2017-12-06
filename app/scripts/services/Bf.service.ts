/**
 * Created by guimin on 2017/9/25.
 */
import { Injectable } from '@angular/core';
import {CustomHttp} from "./customHttp.service";
import {Config} from "./Config.service";
import {Base64} from "./Base64.service";

@Injectable()
export class BfService {
    constructor(
        private http:CustomHttp,
        private config:Config,
        private Base64:Base64
    ){}


    /**
     *
     * @param money 充值金额
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    toRecharge(money:any, method:any, callbackUrl:string,needBase64:any = false){
        let data = {
            money:money,
            method:method,
            callbackUrl:needBase64 ? this.Base64.encode(callbackUrl) : callbackUrl,
            // callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            // callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        };

        return this.http.post(this.config.apiPath.bf.toRecharge, data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     *
     * @param money 注册宝付
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    toRegisterBf(realname:any, chinaId:any, callbackUrl:string,needBase64:any = false){
        let data = {
            realname:realname,
            chinaId:chinaId,
            callbackUrl:needBase64 ? this.Base64.encode(callbackUrl) : callbackUrl,
            // callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            // callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        };

        return this.http.post(this.config.apiPath.bf.toRegisterBf, data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     *
     * @param money 绑定银行卡
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    toBindBankcard(callbackUrl:string){


        return this.http.post(this.config.apiPath.bf.toBindBankcard,{callbackUrl:callbackUrl})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     *
     * @param money 解绑银行卡
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    unbindBankcard(id:any){


        return this.http.post(this.config.apiPath.bf.unbindBankcard, {id:id})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }


    /**
     *
     * @param money 提现
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    toWithdraw(money:number,callbackUrl:string, cardId?:any, isUseTicket?:any,needBase64:any = false){

        let data = {
            money:money,
            cardId:cardId,
            isUseTicket:isUseTicket,
            callbackUrl:needBase64 ? this.Base64.encode(callbackUrl) : callbackUrl,
            // callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            // callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        };


        return this.http.post(this.config.apiPath.bf.toWithdraw,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     *
     * @param money 交易密码
     *
     **/

    toTradePassword(callbackUrl:string){

        return this.http.post(this.config.apiPath.bf.toTradePassword,{callbackUrl:callbackUrl}).then(
            res => {
                return res;
            },error => {
                return Promise.reject(error);

            } );
    }


    /**
     *
     * @description 去激活
     * @param callbackUrl
     * @returns {Promise<TResult>}  failUrl:string,
     *
     */

    toActivate(data){

        return this.http.post(this.config.apiPath.bf.toActivate,data)

          .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);

                } );
    }


    /**
     *
     * @param money 去投资
     * @param successUrl
     * @param callbackUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    toInvest(data){

        return this.http.post(this.config.apiPath.bf.toInvest,data)

            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);

                } );
    }


    /**
     * 转账
     * @param callbackUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */

    toTransfer(data){

        return this.http.post(this.config.apiPath.bf.toTransfer,data)

            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);

                } );
    }



}