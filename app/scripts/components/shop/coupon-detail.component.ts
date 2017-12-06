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

@Component({
    templateUrl: '../../views/shop/coupon-detail.component.html',
    styles:[require("../../views/shop/coupon-detail.component.less")]
})
export class CouponDetailComponent {

    public accountInfo:any;

    private totalPage:number;

    queryParam:any = {
        pageSize:9,
        pageNumber:1,
        status:0,
    };
    private switch:number;
    private statusSwitch:number;
    private isLogin:boolean = false;


    private exchangeRecords:any = [];
    private userExchange:any = {
        pageSize:10,
        pageNumber:1
    };

    private couponDetail:any={
        id:'',
        title:'',
        type:'',
        price:'',
        count:'',
        profile:'',
        remark:''
    };
    private changeNum:number=1;
    private changeBi :number;


    constructor(

        private Account:AccountService,
        private Common:CommonService,
        private Base64:Base64,
        private Config:Config,
        private Tip:TipService,
        private route:ActivatedRoute,
        private shop:ShopService,
        private router:Router,
    ){
        this.switch = 0;
        this.statusSwitch = 1;
        this.totalPage = 5;
        this.route.params.forEach(params=>{
            console.log(params['id']);
            if(params['id'] && params['id'] != 'undefined'){
                this.getCouponDetail(params['id']);
            }
        });
        this.accountInfo = new AccountInfoModel();
        this.getAccountInfo();
        this.getExchangeRecords();

    }

    private sure(){
        let m = this.couponDetail.price*this.changeNum;
        this.changeBi = m;
        if(m > this.accountInfo.integral){
            this.Tip.show("您的星币不足", 3000)
        }else {
            jQuery('#change').modal('show');
        }
        // jQuery('#change').modal('show');

    }

    private toChange(id:any){
        this.shop.change(id,this.changeNum).then(
            res => {
                this.router.navigate(['/shop/success'])
            },err => {
                console.log(err);
                if(err.text){
                    this.Tip.show(err.text,3000);
                }
            }
        )
    }

    private changeNumber(type:number){

            if(type == 1){
                if(this.changeNum >= this.couponDetail.count){
                    this.Tip.show("兑换数量不能大于库存数量",3000);
                    return;
                }
                this.changeNum +=1;
            }else {
                if(this.changeNum == 1)return;
                this.changeNum -=1;
            }
    }
    private getCouponDetail(id:any){
        console.log(id);
        this.shop.getCouponDetail(id).then(

            res => {
                this.couponDetail = res;
            },err => {
                this.couponDetail = '';
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

    private getAccountInfo(){
        this.Account.getAccountInfo().then(
            res => {
                if(res){
                    this.accountInfo = new AccountInfoModel(res);
                }
            }
        )
    }


    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        // this.getMyTickets(this.switch,this.queryParam.status);
    }




}
