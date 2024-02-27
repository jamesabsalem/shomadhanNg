import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], sortedBy: string, order: 'asc' | 'desc'): any {
    if (order === 'asc') {
      return items.sort((a, b) => a[sortedBy] - b[sortedBy]);
    }
    return items.sort((a, b) => b[sortedBy] - a[sortedBy]);
  }
}
