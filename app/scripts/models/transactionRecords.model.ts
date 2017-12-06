export class TransactionRecordsModel {

    id:string;
    timeline:string;
    category:number;
    categoryText:string;
    remark:string;
    cash:number;
    money:number;


    constructor(obj?: any) {
        this.id = obj && obj.id || '';
        this.timeline = obj && obj.timeline || '';
        this.category = obj && obj.category || 0;
        this.categoryText = obj && obj.categoryText || '';
        this.remark = obj && obj.remark || '';
        this.cash = obj && obj.cash || 0;
        this.money = obj && obj.money || 0;
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
        let month = new Date(time).getMonth();
        let day = new Date(time).getDay();

        return year+'-'+(month < 10 ? '0'+month : month)+'-'+(day < 10 ? '0'+day : day);
    }
}
