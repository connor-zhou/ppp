/**
 * Created by LLL on 2016/9/27.
 */
import {Injectable} from '@angular/core';
import  'rxjs/add/operator/toPromise';
import {LocalStrorageService} from './LocalStrorageService.service';
import  {Config} from './Config.service';
import  {CustomHttp} from './customHttp.service'
import { Router } from "@angular/router";
import {GlobalEventsManager} from "./GlobalEventManager.service";
import any = jasmine.any;

@Injectable()
export class AccountService {

    private loginUser: any;

    public  redirectUrl: string;
    constructor(
                private http: CustomHttp,
                private config: Config,
                private LocalStorage: LocalStrorageService,
                private router :Router,
                private globalEventManager:GlobalEventsManager
    ) {
        // 初始化之后，获取用户信息
        // if (this.hasLogin()) {
        //     this.refreshAccountInfo();
        // }
    }



    // 登录
    login(data: any): any {
        return this.http.post(this.config.apiPath.account.login, data)
            .then(
                res => {
                    this.setLogin(res.token);
                    this.globalEventManager.loginSuccess.emit(true);
                    if(this.redirectUrl){
                        this.router.navigate([this.redirectUrl]);
                        return true;
                    }
                    return this.router.navigate(['/my']);
                    // return true;
                }, error => {
                    return Promise.reject(error);
                })
    }

    // 登出
    logout(){
        return this.http.post(this.config.apiPath.account.logout).then(res=>{
            this.unsetLogin();
            this.globalEventManager.logoutSuccess.emit(true);
        },err=>{})
    }

    // 注册
    register(data:any): any {

        return this.http.post(this.config.apiPath.account.register, data).then(res => {

                    this.setLogin(res.token);
                    this.globalEventManager.loginSuccess.emit(true);
                    if(this.redirectUrl){
                        this.router.navigate([this.redirectUrl]);
                        return true;
                    }
                    return this.router.navigate(['/my']);
                }, error => {
                    return Promise.reject(error);
                })
    }



    /**
     * 刷新用户个人信息，个人信息也许会从缓存中拉取
     * 在不要求及时数据的时候，可以从缓存中拉取
     * @param notFromcache
     * @returns {any}
     */
    // refreshAccountInfo(notFromcache?:boolean): Promise<any> {
    //     let oldData:any = this.LocalStorage.get('account.info');
    //     let nowDate:Date = new Date();
    //     let cacheTime = 120;
    //     let timeDiff = 0;
    //     let needRefresh = true;
    //     if(oldData){
    //         if(!oldData['#metadata']){
    //             needRefresh = true;
    //         }else {
    //             timeDiff = nowDate.getTime() - oldData['#metadata'].refreshTime.getTime();
    //             timeDiff = Math.floor(timeDiff/1000);
    //             if(timeDiff > cacheTime || notFromcache){
    //                 needRefresh = true;
    //             }
    //         }
    //     }
    //     if(needRefresh){
    //         return this.http.post(this.config.apiPath.account.info).then(
    //             res => {
    //                 res['#metadata'] = {refreshTime:new Date()};
    //                 this.LocalStorage.set('account.info', res);
    //                 this.loginUser = res;
    //                 return res;
    //             },
    //             error => {
    //                 return Promise.reject(error);
    //             }
    //         );
    //     }else {
    //         this.loginUser = oldData;
    //         return new Promise<any>(function resolver(resolve, reject) {
    //             resolve(oldData);
    //         });
    //     }
    // }


    // 刷新账户信息
    refreshAccountInfo(type?:number){
        return this.http.post(this.config.apiPath.account.info,{},type).then(
            res => {
                this.LocalStorage.set('account.info', res);
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    // 得到账户信息
    getAccountInfo(){

        let info = this.LocalStorage.get('account.info');
        if(info && info != 'undefined'){
            return Promise.resolve(JSON.parse(info));
        }else{
            return this.http.post(this.config.apiPath.account.info).then(res => {
                    this.LocalStorage.set('account.info', res);
                    return res;
                },err => {
                    return Promise.reject(err);
                }
            )
        }

    }



    // sendImgSmsCode(mobile: string,imgCode:string,time:any) {
    //
    //     return this.http.post(this.config.apiPath.account.sendSmsVerifyCode, {mobile: mobile,code:imgCode,uniqueId:time})
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             error => {
    //                 return Promise.reject(error);
    //             }
    //         )
    // }



    // 签到
    sign() {
        return this.http.post(this.config.apiPath.account.sign).then(res => {
               return res;
            },err => {  return Promise.reject(err);}
        )
    }

    // 判断是否登录
    hasLogin() {
        return !!this.getToken();
    }

    // 取消登录状态
    unsetLogin() {
        this.LocalStorage.remove('account.token');
        this.LocalStorage.remove('account.info');
    }

    /**
     * 获取登陆用户相关信息
     * @returns {any}
     */
    public getLoginUser(): Object {
        if (this.hasLogin()) {
            return this.loginUser;
        } else {
            return null;
        }
    }

    /**
     * 用户登录后，及时获取用户的个人信息
     * @param token
     */
    private setLogin(token: any) {
        this.LocalStorage.set('account.token', token);
        this.refreshAccountInfo();
    }


    private getToken() {

        return this.LocalStorage.get('account.token')
    }


    //===== 信息相关 注意：用户必须登陆才能获取相关信息

    /**
     * @description
     * 获取用户名 用户必须登陆
     * @returns {string}
     */
    public getUname(): string {
        //noinspection TypeScriptUnresolvedVariable
        return this.loginUser.uname;
    }

    /**
     * 获取用户的头像地址
     * @returns {string}
     */
    public getAvatar(): string {
        //noinspection TypeScriptUnresolvedVariable
        return this.loginUser.photo;
    }

    /**
     * 获取用户的email地址
     * 未设置email，返回 ''
     * @returns {string}
     */
    public getEmail(): string {
        //noinspection TypeScriptUnresolvedVariable
        var email = this.loginUser.email;
        if (!email) {
            email = '';
        }
        return email;
    }

    /**
     * 用户是否已经开通乾多多
     * @returns {boolean}
     */
    public isOpenMmm(): string {
        return this.loginUser.isOpenMmm;
    }

    /**
     * 获取用户银行卡信息
     * @returns {Promise<any>}
     */
    public getBankCardList(): Promise<any> {
        return this.http.post(this.config.apiPath.account.bankCardList).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 设置主要银行卡
     * @param bankCardId
     * @returns {Promise<boolean>}
     */
    public setMainBankCard(bankCardId):Promise<any>{
        return this.http.post(this.config.apiPath.account.setMainBankcard,{recordId:bankCardId}).then(
            res => {
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 删除银行卡
     * @param bankCardId
     * @returns {Promise<boolean>}
     */
    public removeBankCard(bankCardId):Promise<any>{
        return this.http.post(this.config.apiPath.account.removeBankCard,{recordId:bankCardId}).then(
            res => {
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }



    /**
     * 新卡
     * @param newCard
     * @returns {Promise<boolean>}
     */
    public addBankCard( newCard:any ):Promise<any>{
        return this.http.post(this.config.apiPath.account.addBankCard, newCard).then(
            res => {
                return res.recordId;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 获取原快捷支付银行卡信息
     * @returns {Promise<TResult>}
     */
    public getQuickPayCardInfo( ):Promise<any>{
        return this.http.post(this.config.apiPath.account.getQuickPayCardInfo).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 检查用户是否开通了乾多多
     * @returns {Promise<boolean>}
     */
    public refreshUserHasOpenMmm(): Promise<boolean> {

        return this.http.post(this.config.apiPath.account.isOpenMmm)
            .then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(false);
                }
            );
    }



    /**
     * 回款日历
     * @returns {Promise<void>|Promise<TResult>}
     */
    public getRepaymentCalendar(year:string, month:string):Promise<any>{
        return this.http.post(this.config.apiPath.account.repaymentCalendar, {year : year, month : month})
            .then(
                res => {
                    return res;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    /**
     * 代金券
     * @param status
     * @returns {Promise<TResult>}
     */
    // public getMyTickets(status:number):Promise<any>{
    //     return this.http.post(this.config.apiPath.account.myTickets, {status:status})
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             error => {
    //                 return Promise.reject(error);
    //             }
    //         );
    // }

    /**
     * 加息券
     * @param status
     * @returns {Promise<TResult>}
     */
    // public getMyInterestTickets(status:number):Promise<any>{
    //     return this.http.post(this.config.apiPath.account.myInterestTickets, {status:status})
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             error => {
    //                 return Promise.reject(error);
    //             }
    //         );
    // }

    public getMyMessagePageList(pageSize:any,pageNumber:any):Promise<any>{
        return this.http.post(this.config.apiPath.message.accountMessagePageList,
            {pageSize: pageSize, pageNumber: pageNumber}).then(
                res => {
                    return res;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }


    /**
     * 阅读消息
     * @param status
     * @returns {Promise<TResult>}
     */
    public readMessages(messageIds:any[]):Promise<any>{
        return this.http.post(this.config.apiPath.message.myMarkRead,{msgIds:messageIds.join(',')}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public getMyInvitation(pageSize:any, pageNumber:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.myInvitation,
            {status:'', pageSize : pageSize, pageNumber : pageNumber}).then(
                res => {
                    return res;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public saveNickname(nickname:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.alterNickname,
            {nickname:nickname}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    /**
     * 获取账户安全设置
     * @returns {Promise<TResult>}
     */
    public getSecuritySetting():Promise<any>{
        return this.http.post(this.config.apiPath.account.securitySetting).then(
                res => {
                    return res;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public verifyIdentityToBindPhone(phone:any, smsCode:any, type:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.verifyIdentityToBindPhone,
            {phone:phone,smsCode:smsCode,type:type}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public modifyBindPhone(phone:any, smsCode:any, type:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.modifyBindPhone,
            {phone:phone,smsCode:smsCode, type:type}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public verifyIdentityToModifyEmail(email:any, smsCode:any, type:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.verifyIdentityToModifyEmail,
            {email:email,smsCode:smsCode, type:type}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    public modifyBindEmail(email:any, smsCode:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.modifyBindEmail,
            {email:email,smsCode:smsCode}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    /**
     * 修改登录密码
     * @returns {Promise<TResult>}
     */
    public alterPassword(data:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.alterPassword,data).then(
            res => {
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * 更改邮箱
     * @returns {Promise<TResult>}
     */
    public alterEmail(data:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.alterEmail,data).then(
            res => {
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    public changePassword(oldPassword:any, newPassword:any):Promise<any>{
        return this.http.post(this.config.apiPath.account.changePassword,
            {oldPassword:oldPassword, newPassword:newPassword}).then(
                res => {
                    return true;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    }

    // 找回密码
    public  resetPassword(data):Promise<any>{
        return this.http.post(this.config.apiPath.account.resetPassword, data).then(
            res => {
                this.setLogin(res.token);
                this.globalEventManager.loginSuccess.emit(true);
                return true;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }


    public  getTicketCount():Promise<any>{
        return this.http.post(this.config.apiPath.account.myTicketCount).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }



    /**
     * 获取图形验证码
     * @returns {Promise<any>}
     */
    public getMsgVerifyCode(time:any){
        return this.http.post(this.config.apiPath.common.getMsgVerifyCode,{uniqueId:time}).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }



    /**
     * 获取加息券
     * @returns {Promise<any>}
     */

    public getRateTickets(pageNumber:number, pageSize:number, status:number) {
        return this.http.post(this.config.apiPath.account.getRateTickets, {
            pageNumber: pageNumber,
            pageSize: pageSize,
            status: status
        }).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }

    /**
     * 获取提现券
     * @returns {Promise<any>}
     */

    public getWithdrawTickets() {
        return this.http.post(this.config.apiPath.account.getWithdrawTickets).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }

    /**
     * 获取资金流水
     * @returns {any}data
     */

    public getTransactionRecords(data:any){

        return this.http.post(this.config.apiPath.account.transactionRecords,data).then(

            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )


    }
    /**
     * 获取资金流水
     * @returns {any}data
     */
    // public getTransactionRecords( category:any, startTimeline:any, endTimeline:any, pageNumber?:any, pageSize?:any,){
    //     return this.http.post(this.config.apiPath.account.transactionRecords,{
    //         category:category,
    //         startTimeline:startTimeline,
    //         endTimeline:endTimeline,
    //         pageNumber:pageNumber,
    //         pageSize:pageSize
    //     }).then(
    //
    //         res => {
    //             return res;
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         }
    //     )
    //
    //
    // }

    /**
     * 获取交易记录
     * @returns {any}
     */
    public getInvestmentRecords(data:any){
        return this.http.post(this.config.apiPath.account.investmentRecords,data).then(

            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )


    }



    /**
     * 获取现金券
     * @returns {Promise<any>}
     */

    public getCashTickets(pageNumber:number,pageSize:number,status:number,money?:string){
        return this.http.post(this.config.apiPath.account.getCashTickets,{
            pageNumber:pageNumber,
            pageSize:pageSize,
            status:status,
            money:money ? money:''
        }).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }

    /**
     *
     * 修改头像
     *
     * */
    alterAvatar(avatarData:any):Promise<any>{

        return this.http.post(this.config.apiPath.account.alterAvatar,{avatarData:avatarData})
            .then(
                res=>{
                    return res;
                },error=>{
                    return Promise.reject(error);
                }
            )

    }

    /**
     * 指定投资项目的还款计划
     * @returns {Promise<any>}
     */

    public getRepaymentPlan(id:any){
        return this.http.post(this.config.apiPath.account.repaymentPlan,{
            investId:id
        }).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }

    /**
     * 指定投资项目的借款协议
     * @returns {Promise<any>}
     */

    // public getAgreementLoan(projectId:any){
    //     return this.http.post(this.config.apiPath.account.agreementLoan,{
    //         projectId:projectId
    //     }).then(
    //         res => {
    //             return res;
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         }
    //     )
    // }




    /**
     * 我的风险评估
     * @returns {Promise<any>}
     */

    public riskAssessList(){
        return this.http.post(this.config.apiPath.account.riskAssessList).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }


    /**
     * 我的风险评估提交
     * @returns {Promise<any>}
     */

    public riskAssessSubmit(answer:string){
        return this.http.post(this.config.apiPath.account.riskAssessSubmit,{answer:answer}).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }

    /**
     * 计算加息券的利息
     * @returns {Promise<any>}
     */

    public getProfitCalculation(data){
        return this.http.post(this.config.apiPath.account.profitCalculation,data).then(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
            }
        )
    }







}