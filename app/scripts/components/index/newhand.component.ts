/**
 * Created by Administrator on 2017/6/13.
 */
import { Component,OnInit } from '@angular/core';
import {ProjectService} from "../../services/Project.service";

@Component({
    selector:'newhand',
    templateUrl:'../../views/index/newhand.component.html'
})

export class NewhandComponent implements  OnInit{

    novice:any;
    constructor(
        private Project:ProjectService
    ){}

    ngOnInit(){
        this.Project.noviceProject().then(
            res => {
                if(res){
                    this.novice = res[0];
                    return
                }
                this.novice = null;
            },
            err =>{
                this.novice = null;
            }
        )

    }
}