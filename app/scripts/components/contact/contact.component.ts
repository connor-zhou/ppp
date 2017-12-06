import { Component } from '@angular/core';
import { GlobalEventsManager } from '../../services/GlobalEventManager.service';
import { MessageService } from '../../services/Message.service';

@Component({
    templateUrl:"../../views/contact/contact.component.html",
    styles: [require("../../views/contact/contact.component.less")]
})

export class ContactComponent{
    private articleType = -1;

    constructor(private globalEventsManager: GlobalEventsManager, public Message:MessageService){
        this.globalEventsManager.articleTypeChange.subscribe(type=>{
            this.articleType = type;
        });
    }
}
