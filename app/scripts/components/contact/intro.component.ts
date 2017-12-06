import { Component,OnInit } from '@angular/core';

@Component({
    templateUrl:"../../views/contact/intro.component.html",
    styles: [require("../../views/contact/intro.component.less")]
})

export class IntroComponent implements OnInit{
        private urls:any = [];
        private url:string;
        private switch:number;
        constructor(){
            this.switch = 0;
        }

        ngOnInit(){
            for(let i=0;i<3;i++){
                this.urls.push(require('../../../images/license0'+(i+1)+'.jpg'));
            }
            this.url = this.urls[0]
        }


    private getFile(e:any){
        this.url = e;
    }
}
