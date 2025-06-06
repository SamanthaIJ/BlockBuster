import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToEur',
  standalone: true
})
export class ConvertToEurPipe implements PipeTransform {
  transform(amount: number, currencyCode: string, currencyRate: number): string {
    const convertedAmount = currencyCode === 'EUR' ? amount : amount / currencyRate;
    const formattedAmount = new Intl.NumberFormat('nl-NL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  
    return formattedAmount;
  }

}
