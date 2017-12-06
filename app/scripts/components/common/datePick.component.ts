import {Component, ElementRef, Inject, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../services/Account.service";

import  "../../../../bower_components/jquery-ui-datepicker-smooth/jquery-ui.min.js";

@Component({
    selector:'date-pick',
    encapsulation: ViewEncapsulation.None,
    templateUrl:'../../views/common/datePick.component.html'
    // styles:[require('../../views/common/datePick.component.less')]
})

export class DatePickComponent implements OnInit {

    public selectDayInfo = {
        money:0,
        interest:0,
        day:0,
        recordList:[]
    };

    public repaymentCalendar={
        money:0,
        moneyYet:0,
        dayList:{}
    };

    elementRef: ElementRef;
    days:any = {};
    constructor(@Inject(ElementRef) elementRef: ElementRef, private accountService:AccountService) {
        // this.elementRef = elementRef;
        let today = new Date();
        this.refreshMonthInfo(today.getFullYear(),today.getMonth()+1);
    }

    ngOnInit() {

        let me = this;
        jQuery('#datepicker').datepicker({
            yearSuffix: '年', //年的后缀
            showMonthAfterYear:true,
            monthNames: ['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
            gotoCurrent:true,
            beforeShow:function(ele){
                return []
            },
            beforeShowDay:function (date:Date) {

                let css = '';
                let data = me.days[date.getDate()];
                if(data){
                    if(data['status'] == 0){
                        css = 'has-money';
                    }

                    if(data['status'] == 1){
                        css = 'will-money';
                    }

                    if(data['status'] == 2){
                        css = 'overtime-money';
                    }

                }

                return [false, css];

            },
            onSelect:function(currentText, data){
                return;
            },
            onChangeMonthYear:function (year, month) {
                me.refreshMonthInfo(year, month).then(res=>{
                    me.addTooltip();
                });
            }
        });

        this.addTooltip();
    }


    // 当选择月份时，异步刷新界面。
    private addTooltip(){
        let self = this;
        let timer = window.setTimeout(function(){
            let elements = jQuery('.has-money,.will-money,.overtime-money');
            for(let i = 0 ;i < elements.length;i++){
                let day = jQuery(elements[i]).children('.ui-state-default').html();
                if(!self.days[day])break;
                let statusText = self.days[day]['status'] == 0 ? "已回款":self.days[day]['status'] == 1 ?"待回款":"逾期";
                jQuery(elements[i]).append('<div class="tooltip-box arrow-up"><h3>'+statusText+'</h3><p>本金：'+self.days[day]['capital'].toFixed(2)+'元</p><p>利息：'+self.days[day]['profit'].toFixed(2)+'元</p></div>')
            }
            window.clearTimeout(timer);
        },0)
    }


    // 刷新月份
    private refreshMonthInfo(year, month):Promise<any>{
        return this.accountService.getRepaymentCalendar(year, month).then(res=>{
            this.repaymentCalendar.money = res.money;
            this.repaymentCalendar.moneyYet = res.moneyYet;
            this.days ={};
            if(res.dayList.length >0){
                res.dayList.forEach(dayInfo=>{
                    this.days[dayInfo.day] = {};
                    let days ={
                        '0':{capital:0,profit:0,status:0,flag:false},
                        '1':{capital:0,profit:0,status:1,flag:false},
                        '2':{capital:0,profit:0,status:2,flag:false}
                    };
                    dayInfo.projectList.forEach((val,key)=>{
                        if(val.status == 0){
                            days['0']['flag'] = true;
                            days['0']['capital'] += parseFloat(val.capital);
                            days['0']['profit'] += parseFloat(val.profit)
                        }
                        if(val.status == 1){
                            days['1']['flag'] = true;
                            days['1']['capital'] += parseFloat(val.capital);
                            days['1']['profit'] += parseFloat(val.profit)
                        }
                        if(val.status == 2){
                            days['2']['flag'] = true;
                            days['2']['capital'] += parseFloat(val.capital);
                            days['2']['profit'] += parseFloat(val.profit)
                        }
                    });

                    if(days['0']['flag']){
                        this.days[dayInfo.day] = days['0'];
                    }else if(days['1']['flag']){
                        this.days[dayInfo.day] = days['1'];
                    }else if(days['2']['flag']){
                        this.days[dayInfo.day] = days['2'];
                    }
                });
            }
            jQuery('#datepicker').datepicker('refresh');
            this.addTooltip();
            return res;
        },err=>{
            return Promise.reject(err);
        });
    }

    // private refreshSelectedDayInfo(day:any):void{
    //     this.selectDayInfo.day = day;
    //     let recordList = this.repaymentCalendar.dayList[day];
    //     this.selectDayInfo.money = 0;
    //     this.selectDayInfo.interest = 0;
    //     this.selectDayInfo.recordList = [];
    //     if(recordList)recordList.forEach(res=>{
    //         this.selectDayInfo.money += (res.money-0);
    //         this.selectDayInfo.interest += (res.interest-0);
    //         this.selectDayInfo.recordList.push(res);
    //     });
    // }
}

