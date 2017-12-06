import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/Account.service";

@Component({
    selector:"pie-chart-profit",
    templateUrl: '../../views/my/pieChart.component.html',
    styles:[require('../../views/my/pieChart.component.less')]
})

export class PieChartComponent implements OnInit{

    chartOption:any;
    constructor(public accountService: AccountService) {}

    ngOnInit(){
        this.accountService.getAccountInfo().then(res =>{

                let profitSum = parseFloat(res.profitSum);
                let reward = parseFloat(res.reward);
                let profitWill = parseFloat(res.profitWill);


                this.chartOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}元 ({d}%)"
                    },
                    legend: {
                        selectedMode:false,
                        orient: 'vertical',
                        left: '86%',
                        y:'middle',
                        data:['已获收益','待收收益','活动奖励'],
                        textStyle:{
                            color:'#AEAEAE',
                            fontSize:"14"
                        },
                        align:'left',
                        // formatter: function (name,key) {
                        //     console.log(key);
                        //     return  name;
                        // },
                        itemGap:24,
                        itemWidth:24,
                        itemHeight:24,
                        borderRadius:2
                    },
                    series: [
                        {
                            name:'收益类别',
                            type:'pie',
                            radius: ['43%', '72%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            clockwise:false,
                            center:['40%','50%'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
                                    formatter: '{b}: {c}元',
                                    fontSize:14
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            }
                        }
                    ],
                    color:['#FF5500','#5177C8', '#E7D05E','#D6D6D6']
                };


                let data:any = [
                    {value:profitSum, name:'已获收益'},
                    {value:profitWill, name:'待收收益'},
                    {value:reward, name:'活动奖励'}
                ];

                if(profitSum == 0 && profitWill == 0 && reward == 0){
                    data.push({value:10});
                    this.chartOption.series[0].label.normal.show = false;
                    delete this.chartOption.tooltip;
                }

                this.chartOption.series[0]['data'] = data;
            },err => {});
    }
}