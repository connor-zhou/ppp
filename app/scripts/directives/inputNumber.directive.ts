/**
 * Created by leiliang on 2016/12/1.
 */
import { Directive, ElementRef, HostListener, Input, Renderer  } from '@angular/core';
import {UAService} from "../services/UA.service";

@Directive({
    selector: '[inputNumber]'
})
export class InputNumberDirective{

    private UA:any;

    private isPass:boolean;

    private isDot:boolean;

    private isSupport:boolean;

    constructor(
        private el: ElementRef,
        private renderer: Renderer,
        private UAService:UAService
    ){
        this.UA = this.UAService.getUAService();
        this.isSupport = this.UA.getUA().indexOf('MQQBrowser') == -1;
    }


    @Input('inputNumber') inputNumber: string;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        if(this.isSupport){
            this.isPass = false;this.isDot = false;
            let n = parseInt(this.inputNumber);
            let keyCode = event.keyCode || event.which,v = this.el.nativeElement.value;
            // 数字
            if (keyCode >= 48 && keyCode <= 57 ){this.isPass = true;}
            // 小数字键盘
            if (keyCode >= 96 && keyCode <= 105){this.isPass = true;}
            // Backspace键
            if (keyCode == 8){this.isPass = true;}
            // Delete 键盘
            // if (keyCode == 46){this.isPass = true;}
            // . 小数点
            if (keyCode == 190 || keyCode == 110){this.isPass = true;this.isDot = true;}

            if(this.isPass){
                var index = v.indexOf('.');
                if(index != -1 && this.isDot){ //不允许多个.
                    this.isPass = false;
                }else if(index != -1 && keyCode != 8 && v.length - index > n){ //几位小数
                    this.isPass = false;
                }
            }
            if(!this.isPass){event.preventDefault();}
        }
    }
}