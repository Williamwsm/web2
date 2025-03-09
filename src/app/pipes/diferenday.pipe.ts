import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diferenday',
  standalone: true
})
export class DiferendayPipe implements PipeTransform {

  transform(startDate: Date | string, endDate: Date | string): number {
    // Verifica se as duas datas são válidas
    if (!startDate || !endDate) {
      return 0;
    }

    // Converte as entradas para Date, se necessário
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcula a diferença em milissegundos
    const diffInTime = end.getTime() - start.getTime();

    // Converte a diferença para dias
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    return Math.floor(diffInDays); // Retorna a diferença em dias
  }

}
