/**
 * Created by leiliang on 2017/10/13.
 */
import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
@Component({
    outputs:['selected'],
    selector:'notice-marquee',
    templateUrl:'../../views/common/marquee.component.html',
    styles:[require('../../views/common/marquee.component.less')]
})

export class MarqueeComponent implements OnInit,OnDestroy{


    @Input() textList:any = [];

    public  isPlay:boolean = true;

    public  selected:EventEmitter<any>;

    private timer:any ;

    constructor(){
        this.selected = new EventEmitter<any>(); }


    public play(){
        this.isPlay = true;
    }

    public pause(){
        this.isPlay = false;
    }

    public click(list:any){
        this.selected.emit(list)
    }


    ngOnInit(){
      let index = 0,max = this.textList.length;
      if(max <= 0 ) return;
      this.timer = window.setInterval(() => {
          if(!this.isPlay) return;
          if(index >= max) index = 0;
          jQuery('.marquee-notice').css('top','-'+index * 38+'px');
          index ++
      },3000)
    }

    ngOnDestroy(){
        window.clearInterval(this.timer);
    }

}