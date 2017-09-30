import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sortByCreatedTime'})
export class SortByCreatedTimePipe implements PipeTransform {
  transform(list: any, order: string): any {
    list.sort(function (a: any, b: any) {
      if ( order === 'desc' ) {
        return b.time - a.time;
      } else {
        return a.time - b.time;
      }
    });
    return list;
  }
}
