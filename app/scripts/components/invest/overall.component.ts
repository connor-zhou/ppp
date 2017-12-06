import { Component,OnInit } from '@angular/core';
import {ProjectService} from "../../services/Project.service";
import {CommonService} from "../../services/Common.service";
import {ActivatedRoute,Params} from "@angular/router";
import {MaskService} from "../../services/Mask.service";
import {LoadingService} from "../../services/Loading.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    templateUrl:"../../views/invest/overall.component.html",
    styles:[require('../../views/invest/overall.component.less')]
})

export class OverallComponent implements  OnInit{

    private switch:number;
    private projects:any;

    private currentSwitch :number;

    public totalPage:number;

    public orderDesc:any = [];

    orderByList:any = [];

    data:any = {
        category:0,
        pageSize:10,
        pageNumber:1,
        period:0,
        sort:'',
        orderByList:{}
    };

    project:any ={
        count:0,
        lists:[]
    };

    constructor(
        private Project:ProjectService,
        private Common:CommonService,
        private route:ActivatedRoute,
        private Mask:MaskService,
        private Loading:LoadingService,
    ){
        this.route.params.forEach((params: Params) => {
            let wt = params['switch'] - 0;
            this.switch = wt ? wt :0;
            this.currentSwitch = this.switch;
        });
        this.initParam();
        this.totalPage = 1;
    }


    ngOnInit(){

        this.getProject(this.currentSwitch);
    }


    getProject(type:number){
        // if(type != this.switch){
        //     this.initParam();
        //     this.switch = type;
        // }
        this.switch = type;
        this.data.category = type ;
        this.data.pageNumber = 1;
        this.getPageList(0);
    }



    selectPage(e:any){
        this.data.pageNumber = e.currentPage;
        this.getPageList(1);
    }


    selectPeriod(n:number){
        this.data.period = n;
        this.data.pageNumber = 1;
        this.getPageList(0);
    }


    selectOrder(n:number){
        let status = this.orderDesc[n]['status'];
        let value = this.orderDesc[n]['value'];

        if( n ==  0 ){
            this.orderDesc[0]['status'] = 1;
            this.orderByList = [];
            this.orderDesc.forEach((val,key) =>{
                if( key != 0){
                   this.orderDesc[key]['status'] = 0;
                   this.orderDesc[key]['value'] = 1;
                }
            });

        }else{
            this.orderDesc[0]['status'] = 0;

            if(status == 0)  this.orderDesc[n]['status'] = 1;

            if(status == 1 && value == 1) this.orderDesc[n]['value'] = 0;

            if(status == 1 && value == 0) {
                this.orderDesc[n]['status'] = 0;
                this.orderDesc[n]['value'] = 1;}

            // 如果已经选择，先删除。
            this.orderByList.forEach((val,key) =>{
                if(val && val.split(':')[0] == this.orderDesc[n]['desc'] ){
                    this.orderByList.splice(key,1);
                    return
                }
            });

            // 选中时和选中改变状态时需要新增当前状态
            if(status == 0 || (status == 1 && this.orderDesc[n]['status'] == 1)){
                this.orderByList.push(this.orderDesc[n]['desc']+':'+this.orderDesc[n]['value'])
            }


        }

        this.data.pageNumber = 1;
        this.getPageList(0);

    }

    private changeOrderDesc(n:number){
        if(n >= 0 && n <= 4){
            if(this.orderDesc[n]['status'] == 0){
                this.orderDesc[n]['status'] = 0 ;
            }else if(this.orderDesc[n]['value']  == 1){
                this.orderDesc[n]['value']  = 1;
            }else{
                this.orderDesc[n]['status'] = 0;
                this.orderDesc[n]['value']  = 0;
            }
        }
    }



    initParam(){

        this.orderDesc = [
            {
                desc:'all', // 排序类型
                status:1,   // 是否选中，0 ：没选中，1：已选中
                value:1    //排序值，0：升序 1：降序
            },
            {
                desc:'money',
                status:0,
                value:1
            },
            {
                desc:'duration',
                status:0,
                value:1
            },
            {
                desc:'annualizedRate',
                status:0,
                value:1
            },
            {
                desc:'schedule',
                status:0,
                value:1
            }
        ];
        this.data.pageNumber = 1;
        this.data.period = 0;
        this.data.sort = '';
    }



    private getPageList(type:number){

        this.data.sort = this.orderByList.join(',');

        this.Loading.show(this.Project.pageList(
            this.data.pageSize,
            this.data.pageNumber,
            this.data.category,
            this.data.period,
            this.data.sort
        ).then(res =>{
                this.project.count = Math.ceil((res['count'] - 0) / this.data.pageSize );
                this.project.lists = res['recordList'];
            },err =>{}
        ),type)

    }

}
