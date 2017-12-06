export class TransactionRecrodModel {

    category:number;
    categoryName:string;
    note:string;
    money:number;
    balance:number;
    timeline:Date;

    constructor(obj?: any) {
        this.category = obj && obj.category;
        this.categoryName = obj && obj.categoryName;
        this.note = obj && obj.note;
        this.money = obj && obj.money;
        this.balance = obj && obj.balance;
        this.timeline = obj && this.getValidDate(obj.timeline);
    }

    /**
     * 格式化时间
     * @param source
     * @returns {Date}
     */
    public getValidDate(source:string){
        let a = source.split(/[^0-9]/);
        let y:any,m:any,d:any,h:any=0,j:any=0,s:any=0;
        for(var i=0;i<a.length;i++){
            switch (i){
                case 0:
                    y=a[i];
                    break;
                case 1:
                    m=a[i];
                    break;
                case 2:
                    d=a[i];
                    break;
                case 3:
                    h=a[i];
                    break;
                case 4:
                    j=a[i];
                    break;
                case 4:
                    s=a[i];
                    break;
            }
        }
        return new Date(y,m-1,d,h,j,s);
    }
}