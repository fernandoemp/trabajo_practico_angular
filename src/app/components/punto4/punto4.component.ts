import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Palabra } from './../../models/palabra';
import { CrucigramaService } from 'src/app/services/crucigrama.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-punto4',
  templateUrl: './punto4.component.html',
  styleUrls: ['./punto4.component.css']
})
export class Punto4Component implements OnInit {

  /*variables secundarias mecanismos del juego*/
  nivelActual: number;
  cantidadVidas: number;
  puntaje: number;
  letrasAcertadas: number;
  categoria: string;

  /*variables primarias*/
  palabraActual: any;
  palabraInglesArray: Array<string>;
  palabraUsuarioArray: Array<string>;
  controlesCasillas: Array<boolean>;
  palabras: Array<any>;
  palabrasDisponibles: number;


  constructor(private crucigramaService: CrucigramaService) {
    this.nivelActual = 0;
    this.cantidadVidas = 6;
    this.puntaje = 0;
    this.palabraActual = null;
    this.palabraInglesArray = new Array<string>();
    this.palabraUsuarioArray = new Array<string>();
    this.controlesCasillas = new Array<boolean>();
    this.palabrasDisponibles = 0;
    this.categoria = null;
    this.palabras = new Array<any>();
  }
  ngOnInit(): void {

  }

  obtenerPalabras() {
    this.palabras = this.crucigramaService.getPalabrasPorCategoria(this.categoria);
    this.palabrasDisponibles = this.palabras.length;
  }

  resetPalabra() {

  }
  obtenerPalabraAleatoria() {

    let palabraOk = false;
    if (this.palabrasDisponibles > 0) {
      while (!(palabraOk)) {
        // tslint:disable-next-line: prefer-const
        let posicion = Math.floor(Math.random() * (this.palabras.length - 0));
        if (this.palabras[posicion].jugado === false) {

          this.palabraActual = this.palabras[posicion];
          this.palabraInglesArray = Array.from(this.palabraActual.palabraIngles);


          this.nivelActual += 1;
          this.letrasAcertadas = 0;
          this.palabras[posicion].jugado = true;
          this.palabrasDisponibles -= 1;
          palabraOk = true;
        }
      }
    }
    else {
      swal.fire('GANASTE!', 'Puntaje Final: ' + this.puntaje, 'success');
      this.palabraUsuarioArray = [];
      this.reiniciarJuego();
    }
  }

  comprobarPalabra(indice: number) {

    if (this.palabraUsuarioArray[indice] !== '') {
      this.palabraUsuarioArray[indice] = this.palabraUsuarioArray[indice].toUpperCase();
      if (this.palabraUsuarioArray[indice].toLowerCase() === this.palabraInglesArray[indice]) {
        this.controlesCasillas[indice] = true;
        this.letrasAcertadas += 1;
      }
      else {
        this.cantidadVidas -= 1;
      }

      if (this.cantidadVidas <= 0) {
        swal.fire('PERDISTE!', 'La palabra era "' + this.obtenerPalabraCorrecta() + '". Intentalo nuevamente!', 'info');
        this.reiniciarJuego();
      }
      this.comprobarIgualdad();
    }
  }

  comprobarIgualdad() {
    if (this.letrasAcertadas === this.palabraInglesArray.length) {
      this.puntaje += 1;
      for (let index = 0; index < this.palabraInglesArray.length; index++) {
        this.palabraInglesArray[index] = '';
      }
      swal.fire({
        text: 'Palabra acertada!',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.value) {
          for (let index = 0; index < this.palabraUsuarioArray.length; index++) {
            this.palabraUsuarioArray[index] = '';
          }
        }
        this.reiniciarCasillas();
        this.obtenerPalabraAleatoria();
      });
  }
}

    reiniciarJuego() {
      this.nivelActual = 0;
      this.letrasAcertadas = 0;
      this.puntaje = 0;
      this.cantidadVidas = 6;
      this.categoria = null;
      this.palabras.forEach(element => element.jugado = false);
      for (let index = 0; index < this.palabraInglesArray.length; index++) {
        this.palabraInglesArray[index] = '';
      }
      for (let index = 0; index < this.palabraUsuarioArray.length; index++) {
        this.palabraUsuarioArray[index] = '';
      }
      this.reiniciarCasillas();
    }

    reiniciarCasillas() {
      for (let index = 0; index < this.palabraUsuarioArray.length; index++) {
        this.controlesCasillas[index] = false;
      }
    }

    obtenerPalabraCorrecta(): string {
      // tslint:disable-next-line: label-position
      return this.palabraInglesArray.join('').toUpperCase();
    }
  }




