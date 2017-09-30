import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sortByPrice'})
export class SortByPricePipe implements PipeTransform {
  transform(list: any, order: string): any {
    list.sort(function (a: any, b: any) {
      if ( order === 'desc' ) {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    return list;
  }
}
