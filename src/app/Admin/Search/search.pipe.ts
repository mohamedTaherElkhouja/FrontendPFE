import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLocaleString()
    return value.filter((item : any)=>{
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
