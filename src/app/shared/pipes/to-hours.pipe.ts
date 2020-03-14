import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {
  private minutesInHour = 60;

  transform(value: string, ...args: string[]): string {
    const minutesFromServer = +value;
    const hours = Math.floor(minutesFromServer / this.minutesInHour);
    const minutes = minutesFromServer % this.minutesInHour;
    return `${hours}h ${minutes}min`;
  }

}
