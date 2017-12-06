import { Component } from '@angular/core';

@Component({
    template:`<router-outlet></router-outlet>`
})

export class SSComponent{
    private switch:number;
    private stepNo : number;
    constructor(){
        this.stepNo = 1;
        this.switch = 0;
    }

    goNextStep(){
        this.stepNo++;
        if(this.stepNo > 4){
            this.stepNo = 1;
        }
    }
}
