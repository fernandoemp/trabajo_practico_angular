import { Component, OnInit } from '@angular/core';
import { Asistente } from 'src/app/models/asistente';
import swal from 'sweetalert2';

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

  public limpiarCampos() {
    this.asistente = new Asistente();
  }

  guardarFormulario() {
    if (this.verificarCamposNoNulos()) {
      if (this.verificarFormatoCorreo()) {
        this.asistentes.push(this.asistente);
        swal.fire('Asistencia registrada con exito', 'Usuario ' + this.asistente.usuario, 'success');
        this.asistente = new Asistente();

      }
      else {
        swal.fire('Debe ingresar un correo valido', '', 'error');
      }
    }
      else {
        swal.fire('Debe completar todos los campos para poder registrárse', '', 'error');
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
      if (this.asistente.usuario[index] === '@') {
        arroba = true;
      }
      if (this.asistente.usuario[index] === '.') {
        punto = true;
      }
    }
    return (arroba && punto);
  }
}
