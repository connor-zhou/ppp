import { Component } from '@angular/core';
import {Config} from "../../services/Config.service";

@Component({
    templateUrl:"../../views/contact/contactUs.component.html",
    styles: [require("../../views/contact/contact-us.component.less")]
})

export class ContactUsComponent{
    constructor(
        private Config:Config
    ){}
}


