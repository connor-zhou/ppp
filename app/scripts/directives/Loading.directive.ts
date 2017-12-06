/**
 * Created by leiliang on 2016/12/1.
 */
import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';
import { UAService } from "../services/UA.service";
import {GlobalEventsManager} from "../services/GlobalEventManager.service";

@Directive({
    selector: '[loading]'
})
export class LoadingDirective{

    template:string;

    mask:string;
    constructor(
        private el: ElementRef,
        private renderer: Renderer,
        private UAService:UAService,
        private globalEventsManager:GlobalEventsManager
    ){

        this.template = `
        <div class="loading" id="loading">
            <div class="loading-spinner">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
                <div class="bar9"></div>
                <div class="bar10"></div>
                <div class="bar11"></div>
                <div class="bar12"></div>
            </div>
        </div>`;

        this.globalEventsManager.loading.subscribe((val)=>{
            if(val){
                if(val.show){
                    this.show(val.mode)
                }else{
                    this.hide();
                }
            }
        })
    }

    //-- 0 元素顶部，1 元素底部

    show(mode:number):void{
        this.hide();
        if( mode == 0){
            $(this.el.nativeElement).prepend(this.template)
        }else if(mode == 1){
            $(this.el.nativeElement).append(this.template)
        }
    }

    hide(){
       $(this.el.nativeElement).children('#loading').remove()
    }
}