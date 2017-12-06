/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import { AccountService } from '../../services/Account.service';
import { CommonService } from '../../services/Common.service';
import {Base64} from "../../services/Base64.service";
import {Config} from "../../services/Config.service";
import {Router} from "@angular/router";
import {TipService} from "../../services/Tip.service";
import {AccountInfoModel} from "../../models/accountInfo.model";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/Shop.service";
import {MaskService} from "../../services/Mask.service";

@Component({
    templateUrl: '../../views/shop/star-detail.component.html',
    styles:[require("../../views/shop/star-detail.component.less")]
})
export class StarDetailComponent {


    private switch:number;
    private statusSwitch:number;
    private totalPage:number;

    private myChange:any = [];
    queryParam:any = {
        pageSize:10,
        pageNumber:1,
        period:0,
        category:0
    };

    private exchangeRecords:any = [];
    private userExchange:any = {
        pageSize:10,
        pageNumber:1
    };


    private myLogs:any = [];
    // private mylog:any = {
    //     pageSize:10,
    //     pageNumber:1,
    //     category:0
    // };



    constructor(

        private Account:AccountService,
        private Common:CommonService,
        private Base64:Base64,
        private Config:Config,
        private Tip:TipService,
        private route:ActivatedRoute,
        private shop:ShopService,
        private Mask:MaskService
    ){
        this.switch = 0;
        this.statusSwitch = 0;
        this.totalPage = 1;
        this.route.params.forEach(params=>{
            if(params['type'] && params['type'] != 'undefined'){
                this.switch = params['type'];
                // if(this.switch == 1){
                //     this.getMyLogs();
                // }else {
                //     this.getMyExchangeRecords();
                // }
                this.getChange(this.switch);

            }
        });
        this.getExchangeRecords();

    }

    private getChange(type:number,pageNum?:number){
            if(type == 0){
                this.getMyExchangeRecords(pageNum);
            }else if(type == 1){
                this.getMyLogs(pageNum);
            }
    }

    private getMyLogs(pageNum?:number){
        this.queryParam.category = this.statusSwitch;
        if(pageNum){
            this.queryParam.pageNumber = pageNum;
        }

        let logData = {
            pageNumber:this.queryParam.pageNumber,
            pageSize:this.queryParam.pageSize,
            category:this.queryParam.category,
        };
        this.shop.getMyLogs(logData).then(
            res => {
                this.myLogs = res.recordList;
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
            },err => {
                this.myLogs = [];
                this.totalPage = 0;

            }
        )
    }

    private getMyExchangeRecords(pageNum?:number){
        this.queryParam.period = this.statusSwitch;
        if(pageNum){
            this.queryParam.pageNumber = pageNum;
        }
        let changeData = {
            pageNumber:this.queryParam.pageNumber,
            pageSize:this.queryParam.pageSize,
            period:this.queryParam.period,
        };
        this.shop.getMyExchangeRecords(changeData).then(
            res => {
                this.myChange = res.recordList;
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
            },err => {
                this.myChange = [];
                this.totalPage = 0;
            }
        )
    }


    private getExchangeRecords(){
        this.shop.getExchangeRecords(this.userExchange).then(
            res => {
                this.exchangeRecords = res.recordList;
            },err => {
                this.exchangeRecords = [];
            }
        )
    }




    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.getChange(this.switch)
        // if(this.switch == 1){
        //     this.getMyLogs()
        // }else {
        //     this.getMyExchangeRecords();
        // }

    }







}
