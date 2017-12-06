/**
 * Created by leiliang on 2016/10/11.
 *
 * *自定义分页组件
 *
 * use example:
 *  <pager totalPage="10" (changePage)="changeEvent($event)"></pager>
 *
 *  changeEvent 为自定义事件处理程序
 *
 *  $event 会返回config对象
 *
 *  config:
 *  {
 *      currentPage:当前页码。初始化为1,
        totalPage:总页码，必须填入，不然为0
 *  }
 */

import {Component, Input, EventEmitter, DoCheck} from '@angular/core';

@Component({
    outputs:['changePage'],
    selector:'pager',
    templateUrl:'../../views/common/pager.component.html',
    styles:[require('../../views/common/pager.component.less')]
})



export class PagerComponent implements DoCheck{

    // 取得总页数
    @Input() totalPage:any;
    @Input() refresh:boolean = false;

    _nextPageEnable:boolean;
    _prevPageEnable:boolean;

    config:any = {
        currentPage:1,
        totalPage:0
    };

    data:any = [];
    theLastValue:number;
    changePage: EventEmitter<number>;

    constructor(){
        this.changePage = new EventEmitter<number>();
        this._nextPageEnable = true;
        this._prevPageEnable = false;
        this.theLastValue = this.config.currentPage;
    }


    ngDoCheck(){
        // 是否刷新
        if(this.refresh){
            this.config.currentPage = 1;
            this.theLastValue = 1;
        }
        if(this.totalPage){
            this.config.totalPage = parseInt(this.totalPage);
            this.generateMockData();
        }
    }

    prevPage(){
        if(this.config.currentPage > 1)this.config.currentPage--;
        this.updateStatus();
    }

    nextPage(){
        if(this.config.currentPage < this.totalPage) this.config.currentPage++ ;
        this.updateStatus();
    }

    setFirstPage(){
        this.config.currentPage = 1;
        this.updateStatus();
    }

    setLastPage(){
        this.config.currentPage = this.config.totalPage;
        this.updateStatus();
    }


    isShowHeadAndEnd(){
        this._prevPageEnable = this.config.currentPage == 1 ? false :true;
        this._nextPageEnable = this.config.currentPage == this.config.totalPage ? false :true;
    }

    switch(n:number){

        if(n != 1 && n != this.config.totalPage &&
            (n == this.config.currentPage + 3 ||
            n == this.config.currentPage - 3))return ;

        this.config.currentPage = n;
        this.updateStatus();
    }

    generateMockData(){
        this.data = [];

        for(let  i = 1;i <= this.config.totalPage;i++){
            this.data.push(i)
        }
    }

    updateStatus(){
        this.isShowHeadAndEnd();

        //判断是否为重复点击，若重复，则不触发changePage事件
        if(this.theLastValue == this.config.currentPage) return;
        this.theLastValue = this.config.currentPage;

        this.changePage.emit(this.config);
    }


}