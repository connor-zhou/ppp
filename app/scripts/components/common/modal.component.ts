/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component,OnInit } from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";


@Component({
    selector:'modal',
    templateUrl: '../../views/common/modal.component.html',
    styles: [require('../../views/common/modal.component.less')]


})
export class AppModalComponent implements OnInit{

    hideModal:boolean = true;

    constructor(
        private globalEventsManager:GlobalEventsManager){

        globalEventsManager.hideModal.subscribe((val:boolean) => {
            this.hideModal = val;
        })

    }


    ngOnInit(){
        if(!this.hideModal){
            jQuery('#updateModal').modal('show');
        }
    }

    closeModal(){
        jQuery('#updateModal').modal('hide');
    }
}

