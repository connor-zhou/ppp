import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import  'rxjs/add/operator/toPromise';
import { LocalStrorageService } from './LocalStrorageService.service'
import {Config} from "./Config.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Base64} from "./Base64.service";
import {GlobalEventsManager} from "./GlobalEventManager.service";

@Injectable()
export class CustomHttp {
    prefix: string;

    constructor(
        private http: Http,
        private config: Config,
        private LocalStorage:LocalStrorageService,
        private router:Router,
        private route:ActivatedRoute,
        private base64:Base64,
        private GlobalEventsManager:GlobalEventsManager
    ) {
        this.prefix = this.config.apiPrefix;
    }

    get(url: string) {
        return this.http.get(this.prefix + url, {});
    }

    // type：是否需要跳转到登录界面,0-需要，1-不需要
    post(url: string, data?: any,type?:number) :Promise<any>{
         let headers = new Headers();
         headers.append("Content-Type", "application/x-www-form-urlencoded");
         let options = new RequestOptions({ headers: headers });
         return this.http.post(this.prefix + url, this.getBody(data), options)
                .toPromise()
                .then(res => {
                    if(res.json().code == 0){
                        return res.json().data
                    }else{
                        if(res.json().code == 69633){
                            this.LocalStorage.remove('account.token');
                            this.GlobalEventsManager.logoutSuccess.emit(true);

                            if(!type) {
                                this.router.navigate(['/sign/login']);
                            }
                            // window.location.href = this.config.appConfig.appRootUrl+'/sign/login';
                            return ;
                        }

                        return Promise.reject(res.json());

                    }
                },err =>{
                    return Promise.reject({code:100000,text:'接口返回错误'})
                })
    }

    private getBody(data:any){
        let client = {
            type: 'website',
            version:this.config.appConfig.version,
            website:{
                ua:window.navigator.userAgent
            },
            language:'zh'
        };
        let body = {
            client:'',
            token:'',
        };


        body.client = this.base64.encode(JSON.stringify(client));
        body.token = this.LocalStorage.get('account.token');
        for( let key in data){
            if(data.hasOwnProperty(key)){
                body[key] = data[key]
            }
        }
        return this.transformUrl(body);
    }


    private transformUrl(data:any):string{
        var key, result = [];

        if (typeof data === "string")
            return data;

        for (key in data) {
            if (data.hasOwnProperty(key))
                result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return result.join("&");
    }
}