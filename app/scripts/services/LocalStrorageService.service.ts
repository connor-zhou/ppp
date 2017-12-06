import {Injectable} from '@angular/core';
import  'rxjs/add/operator/toPromise';

@Injectable()
export class LocalStrorageService {
    private localStorage: any;
    constructor( ){
        this.localStorage = window.localStorage;
    }
    get(name:string){
        return this.localStorage.getItem(name);
    }

    set(key:string,data:any){
        if(key != 'account.token' && typeof data != 'string'){
            data = JSON.stringify(data);
        }
        if(key){
            return this.localStorage.setItem(key,data);
        }
    }

    remove(key:string){
        return this.localStorage.removeItem(key)
    }
}