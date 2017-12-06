import { Injectable,EventEmitter} from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public hideNavbar: EventEmitter<any> = new EventEmitter();
    public hideSubNavbar : EventEmitter<any> = new EventEmitter();
    public loginSuccess : EventEmitter<any> = new EventEmitter();
    public logoutSuccess : EventEmitter<any> = new EventEmitter();
    public articleTypeChange : EventEmitter<any> = new EventEmitter();
    public msgNumberChange : EventEmitter<any> = new EventEmitter();
    public goSignToken : EventEmitter<any> = new EventEmitter();
    public hideModal : EventEmitter<any> = new EventEmitter();
    public tip : EventEmitter<any> = new EventEmitter();
    public alterNicknameSuccess : EventEmitter<any> = new EventEmitter();
    public mask : EventEmitter<any> = new EventEmitter();
    public loading : EventEmitter<any> = new EventEmitter();

    constructor() { }
}