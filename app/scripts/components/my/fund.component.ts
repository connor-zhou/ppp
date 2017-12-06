import {
    Component, OnInit
} from '@angular/core';

import any = jasmine.any;
import {AccountService} from "../../services/Account.service";

@Component({
    templateUrl:'../../views/my/fund.component.html',
    styles:[require('../../views/my/fund.component.less')]
})

export class FundComponent implements OnInit {


    private categoryActive:number = 0;
    private durationActive:number = 0;


    private jqBeforeDate:any;
    private jqAfterDate:any;

    fundData:any = {

        pageSize:10,
        pageNumber:1,
        category:0,
        startTimeline:'',
        endTimeline:''
    };

    public totalPage:number = 1;
    private recordAll :any;

    constructor(
        public accountService:AccountService,
    ){
        this.getTransactionRecords();
    }

    ngOnInit() {
        let me = this;
        me.jqBeforeDate = jQuery('#beforeDate').datepicker({
            yearSuffix: '年', //年的后缀
            showMonthAfterYear:true,
            monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
        });
        me.jqAfterDate = jQuery('#afterDate').datepicker({
            yearSuffix: '年', //年的后缀
            showMonthAfterYear:true,
            monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
            gotoCurrent:true
        });

    }


    //时间选择
    public setDuration(n:number):void{
        let startTime = '';
        let endTime = '';
        let now = new Date().getTime();
        this.durationActive = n;

        switch(n){
            case 0:
                break;
            case 1:
                // 7 days
                startTime = now -1000*7*24*60*60 +'';
                endTime = now+'';
                break;
            case 2:
                // 30 days
                startTime = now -1000*30*24*60*60 + '';
                endTime = now+'';
                break;
            case 3:
                // 90 days
                startTime = now - 1000*90*24*60*60 + '';
                endTime = now+'';
                break;
            case 4:
                let startDate = this.jqBeforeDate.datepicker('getDate');
                let endDate =  this.jqAfterDate.datepicker('getDate');
                startTime = startDate ? startDate.getTime() : '';
                endTime = endDate ? endDate.getTime() : '';
                break;
        }

        this.fundData.startTimeline = startTime;
        this.fundData.endTimeline = endTime;
        this.fundData.pageNumber = 1;
        this.getTransactionRecords();
    }

    //交易类型
    public setCategory(cat:number):void{
        this.categoryActive = cat;
        this.fundData.category = cat;
        this.fundData.pageNumber = 1;
        this.getTransactionRecords();
    }

    selectPage(e:any){
        this.fundData.pageNumber = e.currentPage;
        this.getTransactionRecords();
    }


    private getTransactionRecords(){
        this.accountService.getTransactionRecords(this.fundData).then(
            res => {
                this.totalPage = Math.ceil(res.count / this.fundData.pageSize);
                this.recordAll = res.recordList;
            },err => {
                this.totalPage = 0;
                this.recordAll = [];
            }
        )
    }




}
