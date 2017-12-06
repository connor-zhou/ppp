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
import {ShopService} from "../../services/Shop.service";
import {LoadingService} from "../../services/Loading.service";

@Component({
    templateUrl: '../../views/shop/star-home.component.html',
    styles:[require("../../views/shop/star-home.component.less")]
})
export class StarHomeComponent {

    public accountInfo:any;

    private totalPage:number;

    queryParam:any = {
        pageSize:9,
        pageNumber:1
    };
    private isLogin:boolean = false;

    private couponLists:any = [];

    private exchangeRecords:any = [];


    constructor(

        private Account:AccountService,
        private Common:CommonService,
        private Base64:Base64,
        private Config:Config,
        private Tip:TipService,
        private shop:ShopService,
        private Loading:LoadingService
    ){
        this.isLogin = this.Account.hasLogin();
        this.totalPage = 0;
        this.accountInfo = new AccountInfoModel();
        this.getCouponList();

        this.getExchangeRecords();

        if(this.isLogin){
            this.getAccountInfo();
        }
    }

    private getAccountInfo(){
        this.Account.getAccountInfo().then(
            res => {
                if(res){
                    this.accountInfo = new AccountInfoModel(res);
                }
            }
        )
    }

    private getCouponList(){
        this.Loading.show(this.shop.getCouponList(this.queryParam).then(
            res => {
                this.couponLists = res.recordList;
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
            },err => {
                this.couponLists = [];
                this.totalPage = 0;
            }
        ),0)
    }

    private getExchangeRecords(){
        this.Loading.show(this.shop.getExchangeRecords(this.queryParam).then(
            res => {
                this.exchangeRecords = res.recordList;
            },err => {
                this.exchangeRecords = [];
            }
        ),0)
    }

    public sign(){
        if(this.accountInfo.isSign == 1){
            this.Tip.show('您已经签过到了哦');
            return;
        }

        this.Account.sign().then(res=>{
            this.Account.refreshAccountInfo().then(res =>{
                this.accountInfo = new AccountInfoModel(res);
            },err =>{})
        },err=>{
            if(err.text){
                this.Tip.show(err.text);
            }
        })
    }

    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.getCouponList();
    }




}
