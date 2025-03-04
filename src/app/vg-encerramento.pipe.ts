import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgEncerramento',
  standalone: true
})
export class VgEncerramentoPipe implements PipeTransform {
  transform(dataEncerramento: Date): string {
    const agora = new Date(); // Data atual
    const segundos = Math.floor((new Date(dataEncerramento).getTime() - agora.getTime()) / 1000); // Diferença em segundos

    if (segundos < 0) {
      return 'Vaga encerrada';
    }

    // Cálculo do tempo restante
    if (segundos < 60) {
      return `encerra em ${Math.floor(segundos)} segundos`;
    }

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) {
      return `encerra em ${minutos} minutos`;
    }

    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
      return `encerra em ${horas} horas`;
    }

    const dias = Math.floor(horas / 24);
    return `encerra em ${dias} dias`;
  }
}
