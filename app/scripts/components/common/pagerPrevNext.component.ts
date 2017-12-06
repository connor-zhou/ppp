/**
 * Created by leiliang on 2016/10/11.
 */
import { Component,Input,EventEmitter } from '@angular/core';

@Component({
    outputs:['changePage'],
    selector:'pager-prev-next',
    templateUrl:'../../views/common/pagerPrevNext.component.html',
    styles:[require('../../views/common/pagerPrevNext.component.less')]
})

export class PagerPrevNextComponent {
    _nextPageEnable:boolean;
    _prevPageEnable:boolean;

    @Input()
    set nextPageEnable(v: boolean) {
        this._nextPageEnable = v;
    }
    get nextPageEnable(){
        return this._nextPageEnable;
    }

    @Input()
    set prevPageEnable(v: boolean) {
        this._prevPageEnable = v;
    }
    get prevPageEnable(){
        return this._prevPageEnable;
    }

    changePage: EventEmitter<number>;

    constructor(){
        this.changePage = new EventEmitter<number>();
    }

    prevPage(){
        this.changePage.emit(-1);
    }

    nextPage(){
        this.changePage.emit(1);
    }
}