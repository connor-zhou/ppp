/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Config{
    appConfig:any;
    apiPrefix:string;
    apiPath:any;
    imgPath:string;
    fqaConfig:string;
    constructor(){
        this.apiPath = {
            account:{
                //新接口

                //银行卡列表
                bankCardList:'/account/bankCardList',
                //日历
                repaymentCalendar:'/account/repaymentCalendar',
                //更改邮箱
                alterEmail:'/account/alterEmail',
                //交易记录
                investmentRecords:'/account/investmentRecords',
                //资金流水
                transactionRecords:'/account/transactionRecords',
                //更改昵称
                alterNickname:'/account/alterNickname',
                //修改密码
                alterPassword:'/account/alterPassword',
                //更改头像/account/alterAvatar
                alterAvatar:'/account/alterAvatar',
                //提现券
                getWithdrawTickets:"/account/withdrawTickets",
                //还款计划
                repaymentPlan:'/account/repaymentPlan',
                //借款协议/account/agreementLoan
                agreementLoan:'/account/agreementLoan',
                ///account/signIn 签到
                signIn:'/account/signIn',

                sign:'/account/signIn',





                //旧接口

                resetPassword:'/account/resetPassword',
                changePassword:'/account/changePassword',



                sendSmsCode:'/account/sendSmsCode',
                my:'/account/my',
                myInvestment:'/account/myInvestment',
                myInvestmentDetail:'/account/myInvestmentDetail',
                // repaymentCalendar:'/account/repaymentCalendar',
                saveEmail:'/account/saveEmail',
                savePhoto:'/account/savePhoto',
                savePhone:'/account/savePhone',
                saveNickname:'/account/saveNickname',
                securitySetting:'/account/securitySetting',
                verifyIdentityToBindPhone:'/account/verifyIdentityToBindPhone',
                modifyBindPhone:'/account/modifyBindPhone',
                verifyIdentityToModifyEmail:'/account/verifyIdentityToModifyEmail',
                modifyBindEmail:'/account/modifyBindEmail',
                beforeWithdraw:'/account/beforeWithdraw',
                transactionRecord:'/account/transactionRecord',

                myTickets:'/account/myTickets',
                myInterestTickets:'/account/myInterestTickets',
                myAvailableTickets:'/account/myAvailableTickets',
                myAvailInterestTickets:'/account/myAvailInterestTickets',
                myEarningPageList:'/account/myEarningPageList',
                myEarningTicketPageList:'/account/myEarningTicketPageList',
                myInvitation:'/account/myInvitation',
                myInvitationStat:'/account/myInvitationStat',
                myIntegralPageList : '/account/myIntegralPageList',
                // repaymentPlan : '/account/repaymentPlan',
                customerAddressAdd : '/account/customerAddressAdd',
                customerAddressDelete : '/account/customerAddressDelete',
                customerAddressEdit : '/account/customerAddressEdit',
                customerAddressPageList : '/account/customerAddressPageList',
                orderConfirm : '/account/orderConfirm',
                orderPageList : '/account/orderPageList',
                addBankCard : '/account/addBankCard',
                // bankCardList : '/account/bankCardList',
                removeBankCard : '/account/removeBankCard',
                isOpenMmm : '/account/isOpenMmm',
                getMainBankcard :'/account/getMainBankcard',
                setMainBankcard:'/account/setMainBankcard',
                getNameAndChinaId:'/account/getNameAndChinaId',
                getQuickPayCardInfo:'/account/getQuickPayCardInfo',
                myAvailCoupons:'/account/myAvailCoupons',
                myUnavailCoupons:'/account/myUnavailCoupons',
                myCouponDetail:'/account/myCouponDetail',
                myCouponTypeList:'/account/myCouponTypeList',
                myCouponInfoList:'/account/myCouponInfoList',
                getQRCodeUrl:'/account/getQRCodeUrl',
                checkQRCode:'/account/checkQRCode',
                myExperienceMoney:'/account/myExperienceMoney',
                myTicketCount:'/account/myTicketCount',


                // getMsgVerifyCode:'/account/getMsgVerifyCode',
                sendSmsVerifyCode:'/account/sendSmsVerifyCode',
                getCashTickets:"/account/cashTickets",
                getRateTickets:"/account/rateTickets",
                // getWithdrawTickets:"/account/withdrawTickets",
                info:'/account/info',
                logout:'/account/logout',
                login:'/account/login',
                register:'/account/register',
                riskAssessList:"/account/riskAssess/list",
                riskAssessSubmit:"/account/riskAssess/submit",
                ///account/profitCalculation
                profitCalculation:'/account/profitCalculation'


            },
            event:{
                recommend:'/event/carousel',
                lottery:'/event/lottery',
                lotteryPrizeList:'/event/lotteryPrizeList',
                investmentList:'/event/investmentList',
                experienceMoneyIntro:'/event/experienceMoneyIntro',
                activityTime:'/event/activityTime',
                lotteryInfo:'/event/lotteryInfo',
                carousel:'/event/carousel'

            },
            project:{
                recommend:'/project/recommendList',
                pcRecommend:'/project/pcRecommend',
                newerProject:'/project/newerProject',
                //贷后披露
                executionInfo:'/project/executionInfo',



                pageList:'/project/pageList',
                repaymentPlan:'/project/repaymentPlan',
                description:'/project/description',
                enterpriseInfo:'/project/enterpriseInfo',
                guaranteeAndAdvice:'/project/guaranteeAndAdvice',
                moneyOperation:'/project/moneyOperation',
                riskControl:'/project/riskControl',
                investmentPreview:'/project/investmentPreview',
                getRepaymentPlan:'/project/getRepaymentPlan',
                pcDispersedRecommend:'/project/pcDispersedRecommend',
                dispersedPageList:'/project/newPageList',
                dispersedDetail:'/project/dispersedDetail',
                regularDetail:'/project/regularDetail',
                newInvestmentRecords:'/project/newInvestmentRecords',
                interestCalculation:'/project/interestNewCalculation',
                //
                detail:'/project/detail',
                profitCalculation:'/project/profitCalculation',
                investmentRecords:'/project/investmentRecords',
                appendix:'/project/appendix',
                agreementConsult:'/project/agreementConsult'
            },
            bf:{
                //新接口
                //充值
                toRecharge:"/bf/toRecharge",
                toWithdraw:'/bf/toWithdraw',
                //绑定银行卡
                toBindBankcard:'/bf/toBindBankcard',
                //解绑银行卡
                unbindBankcard:'/bf/toUnbindBankcard',
                //宝付注册
                toRegisterBf:'/bf/toRegister',

                //修改交易密码
                toTradePassword:'/bf/toTradePassword',

                //去投资
                toInvest:'/bf/toInvest',
                toActivate:'/bf/toActivate',
                toTransfer:'/bf/toTransfer'
            },
            mmm:{
                //新接口
                //充值
                toRecharge:"/bf/toRecharge",
                toWithdraw:'/bf/toWithdraw',
                //解绑银行卡
                unbindBankcard:'/bf/toUnbindBankcard',



                //旧接口
                toRegister:'/mmm/toRegister',
                // toRecharge:'/mmm/toRecharge',
                // toWithdraw:'/mmm/toWithdraw',
                toInvest:'/mmm/toInvest',
                toCurrentInvest:'/mmm/toCurrentInvest',
                withdrawFee:'/mmm/withdrawFee'
            },
            more: {
                activityPageList:'/description/activityPageList',
                feedbackAdvice:'/more/feedbackAdvice',
                myFeedback:'/more/myFeedback',
                deleteMyFeedback:'/more/deleteMyFeedback'
            },
            common:{
                //图形验证码
                getMsgVerifyCode:'/common/imageCode',
                sendSmsCode:'/common/sendSmsCode',
                // isMobile:'/common/isMobile',
                // bankList:'/common/bankList',
                // branchBankName:'/common/branchBankName',
                // cityList:'/common/cityList',
                // provinceList:'/common/provinceList',
                // getBBSLoginUrl:'/common/getBBSLoginUrl',

                // friendLinks:'/common/friendLinks'


                isRegistered:'/common/isRegistered'
            },
            wechat:{
                jsSignature:'/wechat/jsSignature'
            },
            mall:{
                hotProductList:'/mall/hotProductList',
                productPageList:'/mall/productPageList',
                productDetail:'/mall/productDetail',
                orderPageList:'/mall/orderPageList',
                coinLogPageList:'/mall/coinLogPageList',
                coinRule:'/mall/coinRule',
                checkExchange:'/mall/checkExchange',
                confirmExchange:'/mall/confirmExchange',
                editAddress:'/mall/editAddress',
                deleteAddress:'/mall/deleteAddress',
                addressList:'/mall/addressList',
                addressDetail:'/mall/addressDetail',
                orderDetail:'/mall/orderDetail',
                productIntro:'/mall/productIntro',
                setMainAddress:'/mall/setMainAddress',
                getMainAddress:'/mall/getMainAddress',

                //
                couponList:'/mall/coupon/pageList',
                exchangeRecords:'/mall/integral/exchangeRecords',
                myExchangeRecords:'/mall/integral/myExchangeRecords',
                myLogs:'/mall/integral/MyLogs',
                couponDetail:'/mall/product/detail',
                change:'/mall/product/exchange'

            },
            current:{
                detail:'/current/detail',
                interestCalculation:'/current/interestCalculation',
                myCurrent:'/current/myCurrent',
                myCurrentDetail:'/current/myCurrentDetail',
                myCurrentInterestPageList:'/current/myCurrentInterestPageList',
                myCurrentPrincipalPageList:'/current/myCurrentPrincipalPageList',
                pageList:'/current/pageList',
                redeemInterest:'/current/redeemInterest',
                redeemPrincipal:'/current/redeemPrincipal'
            },
            agreement:{
                investment:'/agreement/investment',
                register:'/agreement/register',
                user:'/agreement/user'
            },
            message:{
                accountMessagePageList:'/message/accountMessagePageList',
                systemMessagePageList:'/message/systemMessagePageList',
                systemMessageDetail:'/message/systemMessageDetail',
                read:'/message/read',
                articleRecommend:'/message/articleRecommend',
                accountMessageInfo:'/message/pageList',


                ///message/pageList
                myMessagePageList:'/message/pageList',
                ///message/markRead
                myMarkRead:'/message/markRead',
                ///message/detail
                myMessageDetail:'/message/detail'

            },
            help:{
                questionCategory:'/help/questionCategory',
                questionList:'/help/questionList',
                answerDetail:'/help/answerDetail',
                search:'/help/search'
            },
            platform:{

                newsPageList:'/platform/news/pageList',
                newsDetail:'/platform/news/detail',
                dealData:'/platform/dealData',
                info:'/platform/info'
            }

        };
        this.appConfig = process.env.appConfig;

        this.fqaConfig = process.env.fqaConfig;

        //noinspection TypeScriptUnresolvedVariable
        this.apiPrefix = this.appConfig.apiBaseUrl;
        // this.apiPrefix = this.appConfig.apiTestUrl;
        //noinspection TypeScriptUnresolvedVariable
        this.imgPath = this.appConfig.baseURL + 'images/';
    }
}