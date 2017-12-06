import { Component } from '@angular/core';

@Component({
    templateUrl:'../../views/my/setEmail.component.html'
})

export class SSSetEmailComponent{
    private switch:number;
    private stepNo : number;


    constructor(){
        this.stepNo = 1;
        this.switch = 0;
    }

    goNextStep(){
        this.stepNo++;
        console.log(this.stepNo);
        if(this.stepNo > 4){
            this.stepNo = 1;
        }
    }
}