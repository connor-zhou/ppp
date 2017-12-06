import {Injectable} from '@angular/core';
import {GlobalEventsManager} from "./GlobalEventManager.service";

@Injectable()

export class MaskService {
   constructor(
       private globalEventsManager:GlobalEventsManager
   ){}


   show(fn:any,text?:string):void{
      this.globalEventsManager.mask.emit({show:true,text:text});
      fn.then(
          res => {
             this.globalEventsManager.mask.emit(false)
          },
          err => {
             this.globalEventsManager.mask.emit(false)
          }
      );

   }

   showSyn(text?:string){
       this.globalEventsManager.mask.emit({show:true,text:text});
   }

   hide(){
      this.globalEventsManager.mask.emit(false)
   }

}