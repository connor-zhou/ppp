import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {defaultIterableDiffers} from "@angular/core/src/change_detection/change_detection";
/*
 * get number's fractional part
 * Usage:
 *   value | fractional:digits
 * Example:
 *   {{ 2.12|fractional:3}}
 *   formats to: 120
 */
@Pipe({name: 'fractional'})
export class FractionalPipe implements PipeTransform {
    transform(value: any, digits: any): string {
        let source = parseFloat(value);
        let mid = source.toFixed(parseInt(digits));
        return mid.split('.')[1];
    }
}