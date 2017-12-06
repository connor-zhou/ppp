
import { Component } from '@angular/core';
import {GlobalEventsManager} from "../../services/GlobalEventManager.service";

@Component({
    template:`<router-outlet></router-outlet>`
})

export class HelpIndexComponent{
    constructor(
        private globalEventsManager: GlobalEventsManager
    ){}
}
