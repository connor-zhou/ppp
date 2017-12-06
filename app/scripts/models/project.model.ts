export class ProjectModel {

    id:string;
    title:string;
    borrowerType:number;
    category:number;
    categoryText:string;
    repaymentMode:string;
    schedule:string;
    status:number;
    statusText:string;
    annualizedRate:string;
    duration:string;
    durationUnit:string;
    money:number;
    minInvest:number;
    maxInvest:number;
    remainInvest:number;
    expireTimeline:string;
    publishTimeline:string;
    repaymentTimeline:string;
    tips:string;
    investTotalCount:string;
    canUseCashTicket:number;
    canUseRateTicket:number;
    isNewUserProject:number;
    isRecommend:number;


    constructor(obj?: any) {
        this.id = obj && obj.id || '';
        this.title = obj && obj.title || '';
        this.borrowerType = obj && obj.borrowerType || 0;
        this.category = obj && obj.category || 0;
        this.categoryText = obj && obj.categoryText || '';
        this.repaymentMode = obj && obj.repaymentMode || '';
        this.schedule = obj && obj.schedule || '';
        this.status = obj && obj.status || 0;
        this.statusText = obj && obj.statusText || '';
        this.annualizedRate = obj && obj.annualizedRate || 12;
        this.duration = obj && obj.duration || 12;
        this.durationUnit = obj && obj.durationUnit || '月';
        this.money = obj && parseFloat(obj.money) || 0;
        this.minInvest = obj && parseFloat(obj.minInvest) || 0;
        this.maxInvest = obj && parseFloat(obj.maxInvest) || 0;
        this.remainInvest = obj && parseFloat(obj.remainInvest) || 0;
        this.expireTimeline = obj && this.getValidDate(obj.expireTimeline)+'' || '';
        this.publishTimeline = obj && this.getValidDate(obj.publishTimeline) || '';
        this.repaymentTimeline = obj && obj.repaymentTimeline || '';
        this.tips = obj && obj.tips || '';
        this.investTotalCount = obj && obj.investTotalCount || '';
        this.canUseCashTicket = obj && obj.canUseCashTicket || '';
        this.canUseRateTicket = obj && obj.canUseRateTicket || '';
        this.isNewUserProject = obj && obj.isNewUserProject || '';
        this.isRecommend = obj && obj.isRecommend || '';
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
        let hours = new Date(time).getHours();
        let minutes = new Date(time).getMinutes();
        let seconds = new Date(time).getSeconds();

        return year+'-'+(month < 10 ? '0'+month : month)+'-'
            +(day < 10 ? '0'+day : day)+' '
            +(hours < 10 ? '0'+hours : hours)+':'
            +(minutes < 10 ? '0'+minutes : minutes)+':'
            +(seconds < 10 ? '0'+seconds : seconds);
    }
}