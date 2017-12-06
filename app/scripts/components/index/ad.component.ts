import { Component,OnInit } from '@angular/core';
import { EventService } from '../../services/Event.service';
@Component({
    selector:'ad',
    templateUrl:'../../views/index/ad.component.html',
    styles:[require('../../views/index/ad.component.less')]
})

export class AdComponent implements OnInit{
    private ad : any  = {photo:'http://192.168.1.86:8082/userfiles/1/_thumbs/images/cms/article/2017/10/%E7%BA%A2%E6%A1%83%E7%9A%87%E5%90%8E.jpg'}
    constructor(private Event:EventService){}

    ngOnInit(){
        // this.Event.carousel(3,'a').then(
        //     res => this.ad = res[0]
        // )
    }

}
