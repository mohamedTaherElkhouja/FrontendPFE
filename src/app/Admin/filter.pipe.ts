import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, filterBy: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      const value = this.getFieldValue(item, filterBy);
      return value && value.toString().toLowerCase().includes(searchTerm);
    });
  }

  getFieldValue(item: any, filterBy: string): any {
    switch (filterBy) {
      case 'emetteur':
        return (item.Id_User?.firstName || '') + ' ' + (item.Id_User?.name || '');
      case 'aq':
        return (item.AQ_UserId?.firstName || '') + ' ' + (item.AQ_UserId?.name || '');
      case 'hse':
        return (item.HSE_UserId?.firstName || '') + ' ' + (item.HSE_UserId?.name || '');
      case 'nature':
        return item.Nature_Dechet?.type_Categorie || '';
      case 'designation':
        return item.Designation || '';
      default:
        return '';
    }
  }
}