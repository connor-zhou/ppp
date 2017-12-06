/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

import  { Config } from './Config.service';
import  { CustomHttp } from './customHttp.service'
import  { Base64 } from './Base64.service';

@Injectable()
export class MmmService {

    constructor(private http: CustomHttp, private config: Config, private Base64:Base64) {
    }

    toRegister(realName:string,id:string,successUrl:string,failUrl:string, needBase64:any = false){
        return this.http.post(this.config.apiPath.mmm.toRegister,{
            realName:realName,
            chinaId:id,
            callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        })
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    toInvest(pid:string,money:string | number,intTicketId:string,awardIds:string,successUrl:string,failUrl:string, needBase64:any = false){
        let data = {
            projectId:pid,
            money:money,
            interestTicketId:intTicketId,
            awardIds:awardIds,
            callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        };

        return this.http.post(this.config.apiPath.mmm.toInvest,data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }

    /**
     *
     * @param money 金额
     * @param cardNo 卡号
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}
     */
    toWithdraw(money:any, cardNo:any, isUseTicket:number,successUrl:string, needBase64:any = false){
        let data = {
            money:money,
            cardNo:cardNo,
            isUseTicket:isUseTicket,
            callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
            // callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
        };

        return this.http.post(this.config.apiPath.mmm.toWithdraw, data)
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } );
    }

    /**
     *
     * @param money 充值金额
     * @param successUrl
     * @param failUrl
     * @returns {Promise<TResult>}  failUrl:string,
     */
    // toRecharge(money:any, method:any, callbackUrl:string,needBase64:any = false){
    //     let data = {
    //         money:money,
    //         method:method,
    //         callbackUrl:needBase64 ? this.Base64.encode(callbackUrl) : callbackUrl,
    //         // callbackUrlSucc:needBase64 ? this.Base64.encode(successUrl) : successUrl,
    //         // callbackUrlFail:needBase64 ? this.Base64.encode(failUrl) :failUrl
    //     };
    //
    //     return this.http.post(this.config.apiPath.mmm.toRecharge, data)
    //         .then(
    //             res => {
    //                 return res;
    //             },error => {
    //                 return Promise.reject(error);
    //             } );
    // }

    getWithdrawFee(money:any){
        return this.http.post(this.config.apiPath.mmm.withdrawFee,{money:money})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


    /**
     * 新接口
     * 删除银行卡
     * @param bankCardId
     * @returns {Promise<boolean>}
     */
    public rmBankCard(bankCardId):Promise<any>{
        return this.http.post(this.config.apiPath.mmm.unbindBankcard,{bankId:bankCardId}).then(
            res => {
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 新接口
     * 增加银行卡
     * @param bankCardId
     * @returns {Promise<boolean>}
     */

    public addBankCard(callbackUrl:string){
        let data = {
            callbackUrl:callbackUrl,
        };
        return this.http.post(this.config.apiPath.mmm.unbindBankcard,data).then(
            res => {
                return res;
            },error => {
                return Promise.reject(error);
            }
        );

    }


}