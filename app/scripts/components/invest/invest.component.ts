import { Component } from '@angular/core';
import { GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    templateUrl:"../../views/invest/index.component.html",
    styles:[require('../../views/invest/index.component.less')]
})

export class InvestComponent{
    constructor(private globalEventsManager: GlobalEventsManager){ }
}
