/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';
import  { Config } from './Config.service';
import  { CustomHttp } from './customHttp.service'

@Injectable()
export class EventService {

    constructor(private http: CustomHttp, private config: Config) { }

    carousel(type:number){
        return this.http.post(this.config.apiPath.event.carousel,{type:type})
            .then(
                res => {
                    return res;
                },error => {
                    return Promise.reject(error);
                } )
    }


}