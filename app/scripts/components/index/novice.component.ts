import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project.service';
import {CommonService} from "../../services/Common.service";

@Component({

    selector: 'novice',
    templateUrl: '../../views/index/novice.component.html'
})

export class NoviceComponent implements OnInit{
    private novice : any;

    constructor(private Project:ProjectService,private Common:CommonService){
    }

    ngOnInit(){
        // this.Project.noviceProject().then(
        //     res => {
        //         this.Common.modifyProject(res).then(
        //             result => {
        //                 this.novice = result[0]
        //             },
        //             err =>{
        //                 this.novice = {}
        //             }
        //         );
        //     },
        //     err =>{
        //         this.novice = '';
        //     }
        // )


    }



}
