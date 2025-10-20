import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePers'
})
export class DatePersPipe implements PipeTransform {
 //



  transform(value: any): string {
    if (!value) return '';

    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',   // lun, mar, mer...
      day: 'numeric',     // 20
      month: 'long',      // octobre
      year: 'numeric'     // 2025
    };

    // Utilise la locale française pour afficher les noms corrects
    return date.toLocaleDateString('fr-FR', options);
  }
}
