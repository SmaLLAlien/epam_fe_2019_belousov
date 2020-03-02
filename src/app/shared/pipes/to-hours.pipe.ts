import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {
  private regexp: RegExp;
  private minutesInHour = 60;

  transform(value: string, ...args: string[]): string {
    this.regexp = new RegExp(/\d+/ig);
    const minutesFromServer = +value.match(this.regexp)[0];
    const hours = (minutesFromServer / this.minutesInHour).toFixed(0);
    const minutes = minutesFromServer % this.minutesInHour;
    return `${hours}h ${minutes}min`;
  }

}
