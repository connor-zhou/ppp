import { Component,OnInit } from '@angular/core';
import { CommonService } from '../../services/Common.service'
import {PlatformService} from "../../services/Platform.server";
@Component({
    selector:'business',
    templateUrl:'../../views/index/business.component.html',
    styles:[require('../../views/index/business.component.less')]
})

export class BusinessComponent implements OnInit{

    private businessData : any = {
        moneySum:'23232.23',
        profitSum:'354454654.45',
        days:'454'
    };
    constructor(private Platform:PlatformService){}

    ngOnInit(){
        this.Platform.getdealData().then(
            res =>  this.businessData = res,
            error => error
        )
    }


}
