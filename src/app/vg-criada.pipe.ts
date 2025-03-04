import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgCriada',
  standalone: true
})
export class VgCriadaPipe implements PipeTransform {

    transform(dataCriacao: Date): string {
      const agora = new Date();
      const segundos = Math.floor((agora.getTime() - new Date(dataCriacao).getTime()) / 1000);

      if (segundos < 60) {
        return `há ${segundos} segundos`;
      }

      const minutos = Math.floor(segundos / 60);
      if (minutos < 60) {
        return `há ${minutos} minutos`;
      }

      const horas = Math.floor(minutos / 60);
      if (horas < 24) {
        return `há ${horas} horas`;
      }

      const dias = Math.floor(horas / 24);
      if (dias < 30) {
        return `há ${dias} dias`;
      }

      const meses = Math.floor(dias / 30);
      if (meses < 12) {
        return `há ${meses} meses`;
      }

      const anos = Math.floor(meses / 12);
      return `há ${anos} anos`;
    }
  }


