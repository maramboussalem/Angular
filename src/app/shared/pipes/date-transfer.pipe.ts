import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransfer'
})
export class DateTransferPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
