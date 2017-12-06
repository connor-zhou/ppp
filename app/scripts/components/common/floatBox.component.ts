/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
    selector:'float-box',
    templateUrl: '../../views/common/floatBox.component.html',
    styles:[require('../../views/common/floatBox.component.less')]
})
export class FloatBoxComponent implements OnInit{
    constructor(private router:Router){

    }

    jumpToTop(){
        jQuery('html,body').animate({
                scrollTop: 0
            },
            300);
    }
    ngOnInit(){}
}

