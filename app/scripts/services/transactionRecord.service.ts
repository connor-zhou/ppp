import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

import {TransactionRecrodModel} from '../models/moneyLog.model';
import  {CustomHttp} from './customHttp.service';
import  {Config} from './Config.service';


@Injectable()
export class TransactionRecordService{

    /**
     * 日志
     */
    public records: Observable<any>;

    private requestParams = {pageNumber:1,pageSize:10};

    // {pageNumber:1,pageSize:1,startTime:'',endTime:'',category:1}
    public queryParametersStream:Subject<any> = new Subject<any>();

    constructor(private http: CustomHttp, private config:Config){

        //merge params, send to server, get result
        this.records = this.queryParametersStream.flatMap(param=>{
            if(param.name){
                if(param.name!='pageNumber'){
                    this.requestParams.pageNumber=1;
                }
                if(param.name=='time'){
                    this.requestParams['startTime'] = param.value[0];
                    this.requestParams['endTime'] = param.value[1];
                }else {
                    this.requestParams[param.name] = param.value;
                }
            }

            return Observable.fromPromise(this.http.post(this.config.apiPath.account.transactionRecord,this.requestParams).then(res=>{
                let logs = [];
                if(res.length >0){
                    res.forEach(log=>{
                       logs.push(new TransactionRecrodModel(log));
                    });
                }
                return logs;
            },err=>{
                return Promise.resolve([]);
            }));
        });
    }

    public setPageSize(size:number){
        this.requestParams.pageSize = size;
    }
}