/**
 * Created by Administrator on 2017/6/14.
 */
import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/Project.service";

@Component({
    selector:'few-mark',
    templateUrl:'../../views/index/few-mark.component.html'
})

export class FewmarkComponent implements  OnInit{


    pageSize:number = 10;


    projectList:any;
    projectLength:any;
    constructor(
        private Project:ProjectService
    ){}

    ngOnInit(){
        // this.Project.pcDispersedRecommend().then(
        //     res =>{
        //         if(res && res.length > 0){
        //             this.projectList = res;
        //             this.projectLength = res.length;
        //             return
        //         }
        //         this.projectList = null;
        //     },
        //     err => {
        //         this.projectList = null;
        //     }
        // )
    }

}