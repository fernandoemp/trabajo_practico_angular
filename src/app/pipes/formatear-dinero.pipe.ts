import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Pipe({
  name: 'moneda'
})
export class FormatearDineroPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
