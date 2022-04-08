import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number): string {
    return (Math.round(value * 100) / 100).toFixed(2);;
  }

}
