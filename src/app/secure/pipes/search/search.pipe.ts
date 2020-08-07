import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(columns: any, searchText: string): any {
    return columns ? columns.filter(column => {
      return !searchText || (column.title.toLowerCase()).indexOf(searchText.toLowerCase()) != -1
    }) : [];
  }

}
