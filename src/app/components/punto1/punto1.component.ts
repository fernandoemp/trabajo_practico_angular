import { Component, OnInit } from '@angular/core';
import { Mensaje } from './../../models/mensaje';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})

export class Punto1Component implements OnInit {

  mensaje: Mensaje;
  tamMaxTexto: number;
  cantidadCaracteresDisponibles: number;
  tamTexto: number;
  mensajes: Array<Mensaje>;

  constructor(private modalService: NgbModal) {
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();
    this.tamMaxTexto = 120;
    this.cantidadCaracteresDisponibles = 120;
  }

  ngOnInit(): void {
  }

  public detectarCaracteresDisponibles() {
    this.cantidadCaracteresDisponibles = this.tamMaxTexto - this.mensaje.texto.length;

  }

  public limpiarCampos() {
   this.mensaje = new Mensaje();
   this.cantidadCaracteresDisponibles = 120;

  }

  public verMensaje(modal) {
    if (this.validarCamposNoNulos()) {
      this.modalService.open(modal);
    }
    else {
      alert('Debe completar todos los campos');
    }
  }

  public enviarMensaje() {
    this.mensaje.fecha = new Date();
    this.mensajes.push(this.mensaje);
    this.mensaje = new Mensaje();
    this.cantidadCaracteresDisponibles = 120;
  }

  public validarCamposNoNulos(): boolean {
    return (this.mensaje.texto != null && this.mensaje.para != null && this.mensaje.de != null);
  }
}


