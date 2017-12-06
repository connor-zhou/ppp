import { Component } from '@angular/core';
import {AccountService} from "../../services/Account.service";
import {MessageService} from "../../services/Message.service";
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    templateUrl:'../../views/my/msgCenter.component.html',
    styles:[require('../../views/my/msgcenter.component.less')]
})

export class MsgCenterComponent{
    private allSelected:boolean = false;

    private messageList:any[] = [];

    private pageNumber:number = 0;

    public prevPageEnable:boolean = false;
    public nextPageEnable:boolean = false;

    private switch : number;

    private msgCount = {
            total:0,
            unread:0
    };

    queryParam:any = {
        pageSize:10,
        pageNumber:1,
        status:'',
        type:0
    };

    private statusSwitch:any=-1;

    private read :boolean = false;
    private totalPage:number = 0;

    private detail:any = {
        title:'',
        timeline:'',
        html:''
    };
    private details:any = [];

    constructor(public accountService: AccountService, private message:MessageService,private globalEventManager:GlobalEventsManager){
        this.switch = 0;
        this.getMessageList(0);
    }


    //未读的数量
    private getUnreadNumber(){
            let data = {
                pageSize:'',
                pageNumber:'',
                status:0,
                type:''
            };
            data.type = this.queryParam.type;
            this.message.getMyMessage(data).then(
                res => {
                    this.msgCount.unread = res.count;
                },err => {

                }
            )
    }


    getMessageList(type:any){
        this.queryParam.type = type;
        this.message.getMyMessage(this.queryParam).then(
            res => {
                this.msgCount.total = res.count;
                // this.msgCount.unread = res.recordList.length;
                this.messageList = res.recordList;
                this.totalPage = Math.ceil(res.count / this.queryParam.pageSize);
                this.getUnreadNumber();
            },err => {
                this.totalPage = 0;
                this.messageList = [];
            }
        );
    }

    selectPage(e:any){
        this.queryParam.pageNumber = e.currentPage;
        this.getMessageList(this.queryParam.type);
    }


    public selectAllMessage():void{
        this.allSelected = !this.allSelected;
        this.messageList.forEach(message=>{
           message.selected = this.allSelected;
        });
    }

    public readSelectedMessages():void{
        let ids = [];
        this.messageList.forEach(message=>{
            if(message.selected){
                ids.push(message.id);
                message.status = 1;
                message.selected = false;
            }
        });
        if(ids.length > 0){
            this.message.setMarkRead(ids).then(res=>{
                this.globalEventManager.msgNumberChange.emit();
                this.allSelected = false;
                this.getUnreadNumber();

            },err=>{

            });
        }
    }

    public readMessage(num:any,message:any){

        if(this.messageList[num]['detail'])return;
        if(message.status == 0){
            message.status = 1;
            this.message.getMyMessageDetail([message.id]).then(res=>{
                this.messageList[num]['detail'] = res.html;
                this.setStatus([message.id]);
            },err=>{
            });
        }else {

            this.message.getMyMessageDetail([message.id]).then(res=>{

                this.messageList[num]['detail'] = res.html;
            },err=>{
            });
        }
    }

    private setStatus(msgIds:any){
        this.message.setMarkRead(msgIds).then(
            res => {
                this.globalEventManager.msgNumberChange.emit();
                this.getUnreadNumber();
            },err => {

            }
        )
    }
}
