import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    templateUrl:"../../views/invest/fail.component.html"
})

export class InvestFailComponent implements OnInit{

    private goTimer:any;
    constructor(private router:Router){}

    ngOnInit(){
        this.goTimer = setInterval(() =>{
            window.clearInterval(this.goTimer);
            this.router.navigate(['/index']);
        },5000)
    }

}
