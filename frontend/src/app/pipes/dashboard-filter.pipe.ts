import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardFilter'
})
export class DashboardFilterPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) {
      return [];
    }
    const role = localStorage.getItem('role') || '';
    if (!role) {
      return items;
    }
    return items.filter(item => item.roles.includes(role));
  }
}
