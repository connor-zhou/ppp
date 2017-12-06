export class AccountInfoModel {



    aid:string;
    avatar:string;
    nickname:string;
    realname:string;
    chinaId:string;
    mobile:string;
    email:string;
    capitalTotal:number;
    profitTotal:number;
    money:number;
    profitSum:number;
    profitWill:number;
    capitalWill:number;
    capitalFreeze:number;
    investmentSum:number;
    integral:number;
    cashTicketsCount:number;
    withdrawTicketsCount:number;
    rateTicketsCount:number;
    isSign:number;
    isOpenBf:number;
    isNewUser:number;
    isRiskAssess:number;
    riskAssessResult:string;
    moneyOldSystem:number;
    isActivate:number;
    hasUnreadMsg:number;







    constructor(obj?: any) {
        this.aid = obj && obj.aid;
        this.avatar = obj && obj.avatar;
        this.nickname = obj && obj.nickname;
        this.realname = obj && obj.realname;
        this.chinaId = obj && obj.chinaId;
        this.mobile = obj && obj.mobile;
        this.email = obj && obj.email;
        this.capitalTotal = obj && parseFloat(obj.capitalTotal) || 0;
        this.profitTotal = obj && parseFloat(obj.profitTotal) || 0;
        this.money = obj && parseFloat(obj.money) || 0;
        this.profitSum = obj && parseFloat(obj.profitSum) || 0;
        this.profitWill = obj && parseFloat(obj.profitWill) || 0;
        this.capitalWill = obj && parseFloat(obj.capitalWill) || 0;
        this.capitalFreeze = obj && parseFloat(obj.capitalFreeze) || 0;
        this.investmentSum = obj && parseFloat(obj.investmentSum) || 0;
        this.integral = obj && parseFloat(obj.integral) || 0;
        this.cashTicketsCount = obj && parseFloat(obj.cashTicketsCount) || 0;
        this.withdrawTicketsCount = obj && parseFloat(obj.withdrawTicketsCount) || 0;
        this.rateTicketsCount = obj && parseFloat(obj.rateTicketsCount) || 0;
        this.isSign = obj && obj.isSign || 0;
        this.isOpenBf = obj && obj.isOpenBf || 0;
        this.isNewUser = obj && obj.isNewUser || 0;
        this.isRiskAssess = obj && obj.isRiskAssess || 0;
        this.riskAssessResult = obj && obj.riskAssessResult;
        this.isSign = obj && obj.isSign || 0;
        this.moneyOldSystem = obj && parseFloat(obj.moneyOldSystem) || 0;
        this.isActivate = obj && obj.isActivate || 0;
        this.hasUnreadMsg = obj && obj.hasUnreadMsg || 0;
    }

    /**
     * 格式化时间
     * @param source
     * @returns {Date}
     */
    public getValidDate(source:string){
        if(!source) return '';
        let time = parseFloat(source);
        let year = new Date(time).getFullYear();
        let month = new Date(time).getMonth() + 1;
        let day = new Date(time).getDate();

        return year+'-'+(month < 10 ? '0'+month : month)+'-'+(day < 10 ? '0'+day : day);
    }
}