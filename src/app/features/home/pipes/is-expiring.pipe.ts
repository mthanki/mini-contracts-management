import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isExpiring',
  standalone: true
})
export class IsExpiringPipe implements PipeTransform {
  transform(endDate: string | Date): boolean {
    const end = new Date(endDate);
    const now = new Date();
    const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  }
}
