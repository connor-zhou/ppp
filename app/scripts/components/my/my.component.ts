import {Component, ViewEncapsulation} from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";
@Component({
    templateUrl:'../../views/my/my.component.html',
    encapsulation: ViewEncapsulation.None,
    styles:[require('../../views/common/datePick.component.less'),require('../../views/my/my.component.less')]
})

export class MyComponent{
    constructor(private globalEventsManager:GlobalEventsManager){}
}
