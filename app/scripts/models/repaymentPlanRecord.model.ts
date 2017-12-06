export class RepaymentPlanRecordModel {

    planTime:Date;
    interestWill:number;
    capitalWill:number;
    days:number;
    status:number;
    statusName:string;

    constructor(obj?: any) {
        this.planTime = obj && this.getValidDate(obj.planTime);
        this.interestWill = obj && parseFloat(obj.interestWill.toString());
        this.capitalWill = obj && parseFloat(obj.capitalWill.toString());
        this.days = obj && parseInt(obj.days.toString());
        this.status = obj && parseInt(obj.status.toString());
        this.statusName = obj && obj.statusName;
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