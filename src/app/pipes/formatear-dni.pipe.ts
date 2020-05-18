import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class FormatearDniPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
