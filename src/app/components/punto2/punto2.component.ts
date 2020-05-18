import { Component, OnInit } from '@angular/core';
import { Asistente } from 'src/app/models/asistente';

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component implements OnInit {


  asistente: Asistente;
  asistentes: Array<Asistente>;
  opcionSi = true;
  opcionNo = false;


  constructor() {
    this.asistente = new Asistente();
    this.asistentes = Array<Asistente>();
  }

  ngOnInit(): void {
  }

  public limpiarCampos(){
     this.asistente = new Asistente();
  }

    guardarFormulario(){
      if (this.verificarCamposNoNulos()){
        if (this.verificarFormatoCorreo()){
          this.asistentes.push(this.asistente);
          this.asistente = new Asistente();
        }
        else{
          alert('Debe ingresar un correo valido');
        }
      }
      else{
        alert('Debe completar todos los campos para poder registrárse');
      }
    }

    verificarCamposNoNulos(): boolean {
      return (this.asistente.usuario != null && this.asistente.nombreOrganizacion != null && this.asistente.solicitaConstancia != null);
    }

    verificarFormatoCorreo(): boolean {
      let arroba = false;
      let punto = false;

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.asistente.usuario.length; index++) {
          if (this.asistente.usuario[index] === '@'){
            arroba = true;
          }
          if (this.asistente.usuario[index] === '.'){
            punto = true;
          }
      }
      return (arroba && punto);
    }
}
