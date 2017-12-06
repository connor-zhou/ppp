import {ProjectModel} from './project.model';

export class InvestRecordModel {

    iid:string;
    pid:string;
    money:number;
    interestYet:number;
    interestWill:number;
    status:number;
    statusName:string;
    days:number;
    project:ProjectModel;



    constructor(obj?: any) {
        this.iid = obj && obj.iid.toString();
        this.pid = obj && obj.pid.toString();
        this.money = obj && parseFloat(obj.money.toString());
        this.interestYet = obj && parseFloat(obj.interestYet.toString());
        this.interestWill = obj && parseFloat(obj.interestWill.toString());
        this.status = obj && parseInt(obj.status.toString());
        this.statusName = obj && obj.statusName;
        this.days = obj && parseInt(obj.days.toString());
        this.project = obj && obj.project && new ProjectModel(obj.project);

    }
}