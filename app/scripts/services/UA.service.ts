/**
 * Created by LLL on 2016/9/27.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class UAService {

    constructor(){}

    getUAService(){
        let UA =  require('ua-parser-js');
        return new UA();
    }
}