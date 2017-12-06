/**
 * Created by Administrator on 2017/6/14.
 */
import { Component,OnInit } from '@angular/core';
import {ProjectService} from "../../services/Project.service";

@Component({
    selector:'manage-money',
    templateUrl:'../../views/index/manage-money.component.html'
})

export class ManageMoneyComponent implements  OnInit{

    // project:any;
    projectList :any;
    projectLength:any;
    constructor(
        private Project:ProjectService
    ){}

    ngOnInit(){

        this.Project.recommend().then(
            res => {
                if(res){
                    // this.projectList = res[0];
                    this.projectList = res;
                    this.projectLength = res.length;
                    return
                }

                this.projectList = null;
            },
            err => {
                this.projectList = null;
            }
        )

    }
}