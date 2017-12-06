import { Component,OnInit,OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/Project.service'
import {CommonService} from "../../services/Common.service";

@Component({
    selector:'recommend',
    templateUrl:'../../views/index/recommend.component.html',
    styles: [require("../../views/index/recommend.component.less")]

})

export class RecommendComponent implements OnInit{


    recommendList:any[] = [];

    constructor(private Project:ProjectService,private Common:CommonService){}

    ngOnInit(){

        this.Project.recommend().then(res=>{
            this.recommendList = res.recordList;
        },err=>{})

    }
}
