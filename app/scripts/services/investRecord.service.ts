import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

import  {CustomHttp} from './customHttp.service';
import  {Config} from './Config.service';
import {InvestRecordModel} from '../models/investRecord.model';
import {RepaymentPlanRecordModel} from '../models/repaymentPlanRecord.model';



@Injectable()
export class InvestRecordService{

    /**
     * 日志
     */
    public records: Observable<any>;

    public repaymentPlanRecords:Observable<any>;

    private requestParams = {flag:1};

    private repaymentRequestParams = {recordId:0};

    // {pageNumber:1,pageSize:1,startTime:'',endTime:'',category:1}
    public queryParametersStream:Subject<any> = new Subject<any>();

    public repaymentParametersStream:Subject<any> = new Subject<any>();

    constructor(private http: CustomHttp, private config:Config){

        //merge params, send to server, get result
        this.records = this.queryParametersStream.flatMap(param=>{
            if(param.name){
                this.requestParams[param.name] = param.value;
            }

            return Observable.fromPromise(this.http.post(this.config.apiPath.account.myInvestment,this.requestParams).then(res=>{
                let records = [];
                if(res.projectList.length >0){
                    res.projectList.forEach(r=>{
                        records.push(new InvestRecordModel(r));
                    });
                }
                return records;
            },err=>{
                return Promise.resolve([]);
            }));
        });

        this.repaymentPlanRecords = this.repaymentParametersStream.flatMap(param=>{
            if(param.name){
                this.repaymentRequestParams[param.name] = param.value;
            }

            return Observable.fromPromise(this.http.post(this.config.apiPath.account.repaymentPlan,this.repaymentRequestParams).then(res=>{
                let re = {
                    money:0,
                    revenue:0,
                    records:[]
                };
                if(res.recordList.length >0){
                    res.recordList.forEach(r=>{
                        re.records.push(new RepaymentPlanRecordModel(r));
                    });
                    re.money = parseFloat(res.money.toString());
                    re.revenue = parseFloat(res.revenue.toString());
                }
                return re;
            },err=>{
                return Promise.resolve({
                    money:0,
                    revenue:0,
                    records:[]
                });
            }));
        });
    }
}