/**
 * Created by Lei liang on 2016/8/30.
 */
import { Component } from '@angular/core';
import { GlobalEventsManager } from '../../services/GlobalEventManager.service'

@Component({

    templateUrl: '../../views/sign/success.register.component.html',
    styles:[require("../../views/sign/success-register.component.less")]
})
export class RegisterSuccessComponent {
    constructor(private globalEventsManager: GlobalEventsManager){
    }
}

