import {Injectable, ElementRef} from '@angular/core';
import {GlobalEventsManager} from "./GlobalEventManager.service";

@Injectable()

export class LoadingService {
   constructor(
       private globalEventsManager:GlobalEventsManager
   ){

   }

   // -- 0 元素顶部，1 元素底部
   show(fn:any,mode:number){
      let Config ={
         show:false,
         mode:2
      };
      this.globalEventsManager.loading.emit({show:true,mode:mode});
      fn.then(
          res => {
             this.globalEventsManager.loading.emit(Config)
          },
          err => {
             this.globalEventsManager.loading.emit(Config)
          }
      );
   }

   showSync(mode:number){
      this.globalEventsManager.loading.emit({show:true,mode:mode ? mode:0})
   }

   hide(){
      let config ={
         show:false,
         mode:2
      };

      this.globalEventsManager.loading.emit(config)
   }
}
