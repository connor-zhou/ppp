import {AfterViewInit, Component, OnInit, Pipe, PipeTransform} from '@angular/core';

import {HelpService} from '../../services/Help.service';
import {Config} from "../../services/Config.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    templateUrl:'../../views/help/help.component.html',
    styles:[require('../../views/help/help.component.less')]
})

export class HelpComponent  implements OnInit,AfterViewInit{



    public questions:any;

    public titles:any[];

    constructor(
        private Help:HelpService,
        private Config:Config,
        private sanitizer:DomSanitizer
    ){}


    ngOnInit(){
        this.questions = this.Config.fqaConfig;
        this.titles = Object.keys(this.questions);





    }

    ngAfterViewInit(){
        console.log(jQuery('.ab'));
        $('.ab').collapse({
            toggle:true
        })
    }

    public getFqa(key:string){
        if(!key || !this.questions[key]) return [];

        let arr:any[] = [];

        this.questions[key].forEach(val =>{
            arr.push({ title:this.sanitizer.bypassSecurityTrustHtml(Object.keys(val)[0]),content:this.sanitizer.bypassSecurityTrustHtml(val[Object.keys(val)[0]])})
        });

        return arr;

    }




}
