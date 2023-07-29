import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaHoyService {

   obtenerFechaHoy(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = this.padNumber(today.getMonth() + 1);
    const day = this.padNumber(today.getDate());
    return `${year}-${month}-${day}`;
  }

  private padNumber(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }
}
