import { Pipe, PipeTransform } from '@angular/core';
/*
 * Math.floor(string|number)
 * Usage:
 *   value | mathFloor
 * Example:
 *   {{ 2.12|mathFloor}}
 *   formats to: 2
 */
@Pipe({name: 'mathFloor'})
export class MathFloorPipe implements PipeTransform {
    transform(value: any): string {
        return Math.floor(parseFloat(value)) + '';
    }
}