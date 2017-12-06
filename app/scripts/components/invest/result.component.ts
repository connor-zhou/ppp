import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/Project.service";
import {ActivatedRoute,Params} from "@angular/router";

@Component({
    templateUrl:"../../views/invest/result.component.html",
    styles:[require('../../views/invest/result.component.less')]
})

export class InvestResultComponent {


        private projectId:string;
        private code:number;
        private text:string;
        private money:any;
        constructor(
            private Project:ProjectService,
            private route:ActivatedRoute){


            this.route
                .queryParams
                .subscribe(params => {
                    if(params['code'] == 0){this.code = params['code']}
                    if(params['text']){this.text = params['text']}
                });

            this.route.params.subscribe(val =>{
                if(val.id) this.projectId = val.id;
            })
        }

}
