import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Array<any>, args: string): any[] {
    console.log('pipe => ', value, args);
    if(!value)return null;
    if(!args)return value;
    return value.filter(val => val.category.indexOf(args) !== -1);
  }

}
