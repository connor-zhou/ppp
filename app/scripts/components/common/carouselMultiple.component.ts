/**
 * Created by leiliang on 2017/10/13.
 */
import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
@Component({
    outputs:['selected'],
    selector:'carousel-multiple',
    templateUrl:'../../views/common/carouselMultiple.component.html',
    styles:[require('../../views/common/carouselMultiple.component.less')]
})

export class CarouselMultipleComponent implements OnInit,OnDestroy,AfterViewInit{

    @Input() imgList:any =[];
    @Input() contentWidth:number;
    @Input() contentHeight:number;
    @Input() frameWidth:number;
    @Input() marginRight:number;
    @Input() autoPlay:boolean;
    @Input() minNumber:number = 0;

    private timer:any ;

    public  isPlay:boolean = true;

    public max:number = 0;

    public index:number;

    public activeIndex:number = 0;

    public  selected:EventEmitter<any>;

    constructor(){

        this.selected = new EventEmitter<any>();
        this.autoPlay = false;
    }



    ngOnInit(){
        this.index = 0;
        this.max = this.imgList.length - this.minNumber;
        if(this.max <= 0 || !this.autoPlay) return;
        this.timer = window.setInterval(() => {
            if(!this.isPlay) return;
            if(this.index > this.max) this.index = 0;
            let w = this.index == 0 ? 0 :this.index * (this.frameWidth ? this.frameWidth : 216+ this.marginRight ? this.marginRight :10);
            jQuery('.carousel-content').css('left','-'+ w +'px');
            this.index ++
        },2000)
    }

    ngOnDestroy(){
        window.clearInterval(this.timer);
    }


    public play(){
        this.isPlay = true;
    }

    public pause(){
        this.isPlay = false;
    }

    public goNext(){
        if(this.max <= 0)return;
        this.index ++;
        this.updateDom();
    }

    public goPrev(){
        if(this.max <= 0)return;
        this.index --;
        this.updateDom();
    }

    public updateDom(){
        if(this.index > this.max) this.index = 0;
        if(this.index < 0 )this.index = 0;
        let w = this.index == 0 ? 0 :this.index * ((this.frameWidth ? this.frameWidth : 216) + (this.marginRight ? this.marginRight :10));
        jQuery('.carousel-content').css('left','-'+ w +'px');
    }

    private initDom(){
        let eleMultiple = jQuery('.carousel-multiple');
        let item = jQuery('.carousel-content >a');
        let contentWidth = this.contentWidth ? this.contentWidth :1200;
        let contentHeight = this.contentHeight ? this.contentHeight :90;
        let frameWidth = this.frameWidth ? this.frameWidth :216;
        let marginRight = this.marginRight ? this.marginRight :10;

        eleMultiple.css('width',contentWidth+'px');
        eleMultiple.css('height',contentHeight+'px');
        item.css('width',frameWidth+'px');
        item.css('margin-right',marginRight+'px');

        jQuery('.carousel-content').css('width',( this.max + this.minNumber) * (frameWidth + marginRight));
        jQuery('.arrow.arrow-right').css('left',contentWidth - 40+'px')
    }



    ngAfterViewInit() {
        this.initDom();
    }

    hover(n:number,e:any){
        this.activeIndex = n;
        this.selected.emit(e);
    }

    selectItem(n:number,img:any){
        this.activeIndex = n;
        this.selected.emit(img);
    }



}