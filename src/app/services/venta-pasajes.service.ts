import { Injectable } from '@angular/core';
import { Pasaje } from './../models/pasaje';

@Injectable({
  providedIn: 'root'
})
export class VentaPasajesService {
  categorias: Array<any>;
  pasajesVendidos: Array<Pasaje>;

  constructor() {
    this.pasajesVendidos = new Array<Pasaje>();

    this.categorias = [
      { id: 'm', categoria: 'Menor' },
      { id: 'a', categoria: 'Adulto' },
      { id: 'j', categoria: 'Jubilado' }
    ];
  }

  getPasajesVendidos() {
    return this.pasajesVendidos;
  }

  addPasajeVendido(pasaje: Pasaje) {
    this.pasajesVendidos.push(pasaje);
  }

  deletePasajeVendido(pasaje: Pasaje) {
    // tslint:disable-next-line: prefer-const
    let indice = this.pasajesVendidos.findIndex((item: Pasaje) => item.dniPasajero === pasaje.dniPasajero);
    this.pasajesVendidos.splice(indice, 1);
  }

  updatePasajeVendido(pasaje: Pasaje) {
    // tslint:disable-next-line: prefer-const
    let indice = this.pasajesVendidos.findIndex((item: Pasaje) => item.dniPasajero === pasaje.dniPasajero);
    this.pasajesVendidos.splice(indice, 1, pasaje);
    console.log(pasaje);
  }

  getCategorias() {
    return this.categorias;
  }
}
