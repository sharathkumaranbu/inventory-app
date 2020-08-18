import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbers'
})
export class NumbersPipe implements PipeTransform {
  transform(value: number): any {
    return new Array(value);
  }
}
