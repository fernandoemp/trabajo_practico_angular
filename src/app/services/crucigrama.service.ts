import { Injectable } from '@angular/core';
import { Palabra } from './../models/palabra';

@Injectable({
  providedIn: 'root'
})
export class CrucigramaService {


  palabras: Array<any>;
  categorias;

  constructor() {
    this.palabras = [
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'pencil', palabraEspaniol: 'lapiz', urlImagen: './../../../assets/img/lapiz.jpg', categoria: 'utiles', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'eraser', palabraEspaniol: 'goma', urlImagen: './../../../assets/img/goma.jpg', categoria: 'utiles', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'bag', palabraEspaniol: 'mochila', urlImagen: './../../../assets/img/mochila.jpg', categoria: 'utiles', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'rule', palabraEspaniol: 'regla', urlImagen: './../../../assets/img/regla.jpg', categoria: 'utiles', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'flower', palabraEspaniol: 'flor', urlImagen: './../../../assets/img/flor.jpg', categoria: 'naturaleza', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'tree', palabraEspaniol: 'arbol', urlImagen: './../../../assets/img/arbol.jpg', categoria: 'naturaleza', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'ocean', palabraEspaniol: 'oceano', urlImagen: './../../../assets/img/oceano.jpg', categoria: 'naturaleza', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'river', palabraEspaniol: 'rio', urlImagen: './../../../assets/img/rio.jpeg', categoria: 'naturaleza', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'dog', palabraEspaniol: 'perro', urlImagen: './../../../assets/img/perro.jpg', categoria: 'animales', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'horse', palabraEspaniol: 'caballo', urlImagen: './../../../assets/img/caballo.jpg', categoria: 'animales', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'rabbit', palabraEspaniol: 'conejo', urlImagen: './../../../assets/img/conejo.jpg', categoria: 'animales', jugado: false },
      // tslint:disable-next-line: max-line-length
      { palabraIngles: 'penguin', palabraEspaniol: 'pingüino', urlImagen: './../../../assets/img/pinguino.jpg', categoria: 'animales', jugado: false },

    ];


    this.categorias = [
      { id: 'animales', categoria: 'Animales' },
      { id: 'naturaleza', categoria: 'Naturaleza' },
      { id: 'utiles', categoria: 'Útiles' },
      { id: '', categoria: 'Aleatorio' }
    ];

  }


  getPalabras() {
    return this.palabras;
  }

  getPalabrasPorCategoria(categoria: string) {
    // tslint:disable-next-line: prefer-const
    let listaPalabras = new Array<any>();

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.palabras.length; index++) {
      if (this.palabras[index].categoria === categoria) {
        listaPalabras.push(this.palabras[index]);
      }
    }
    return listaPalabras;
  }

  getPalabra() {
    let palabraDisponible = false;
    let posicion = 0;
    while (!(palabraDisponible)) {
      posicion = Math.floor(Math.random() * (10 - 0));
      if (this.palabras[posicion].jugado === false) {
        palabraDisponible = true;
        // this.palabras[posicion].jugado = true;
      }
    }
    return this.palabras[posicion];
  }

}
