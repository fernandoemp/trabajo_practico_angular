import { Component, OnInit } from '@angular/core';
import { VentaPasajesService } from 'src/app/services/venta-pasajes.service';
import { Pasaje } from 'src/app/models/pasaje';
import swal from 'sweetalert2';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})
export class Punto3Component implements OnInit {

  pasaje: Pasaje;
  pasajesVendidos: Array<Pasaje>;
  precioFinal: number;
  cantidadMenores: number;
  cantidadAdultos: number;
  cantidadJubilados: number;
  cantitadTotalBoletosVendidos: number;
  facturacionTotal: number;
  realizarVenta: boolean;
  estadisticas: boolean;
  realizarModificacion: boolean;
  ventaSeleccionada: Pasaje;
  categorias: Array<any>;

  constructor(private ventaPasajeService: VentaPasajesService) {
    this.pasaje = new Pasaje();
    this.pasajesVendidos = new Array<Pasaje>();
    this.ventaSeleccionada = new Pasaje();
    this.cantidadMenores = 0;
    this.cantidadAdultos = 0;
    this.cantidadJubilados = 0;
    this.cantitadTotalBoletosVendidos = 0;
    this.facturacionTotal = 0;
    this.ventaSeleccionada = null;
    this.estadisticas = false;
    this.realizarVenta = true;
    this.realizarModificacion = false;
    this.obtenerPasajesVendidos();
    this.obtenerCategorias();


  }

  ngOnInit(): void {
  }
  obtenerCategorias(){
    this.categorias = this.ventaPasajeService.getCategorias();
  }

  venderPasaje() {
    if (this.comprobarCamposNoNulos()) {
      this.pasaje.fechaCompra = new Date();
      this.pasaje.precioPasaje = this.precioFinal;
      this.ventaPasajeService.addPasajeVendido(this.pasaje);
      switch (this.pasaje.categoriaPasajero) {
        case 'm': {
          this.cantidadMenores += 1;
          break;
        }
        case 'a': {
          this.cantidadAdultos += 1;
          break;
        }
        case 'j': {
          this.cantidadJubilados += 1;
          break;
        }
      }
      this.cantitadTotalBoletosVendidos += 1;
      this.facturacionTotal += this.pasaje.precioPasaje;
      this.pasaje = new Pasaje();
      this.precioFinal = null;
      swal.fire('Venta registrada con exito', '', 'success');
      this.obtenerPasajesVendidos();
    }
    else {
      swal.fire('Debe completar todos los campos', '', 'error');
    }
  }

  modificarPasaje() {
    if (this.ventaSeleccionada != null) {
      swal.fire({
        title: 'Modificar la venta?',
        text: 'Desea modificar la venta del cliente con DNI ' + this.pasaje.dniPasajero.toString() + '?',
        icon: 'warning',
        showCancelButton: true,
        /*confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',*/
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.pasaje.precioPasaje = this.precioFinal;
          this.ventaPasajeService.updatePasajeVendido(this.pasaje);
          this.limpiarCampos();
          this.ventaSeleccionada = null;
          swal.fire(
            'Venta Modificada!',
            '',
            'success'
          );
        }
        else if (result.dismiss === swal.DismissReason.cancel) {
          this.pasaje.precioPasaje = this.ventaSeleccionada.precioPasaje;
          this.pasaje.categoriaPasajero = this.ventaSeleccionada.categoriaPasajero;
          this.pasaje.dniPasajero = this.ventaSeleccionada.dniPasajero;
          this.obtenerPasajesVendidos();
          this.limpiarCampos();
          swal.fire(
            'Accion cancelada',
            '',
            'error'

          );
        }
      });
    } else {
      swal.fire('No ha seleccionado ninguna venta', '', 'error');
    }

  }
  elegirOperacionVenta(pasaje: Pasaje) {
    this.ventaSeleccionada = new Pasaje();
    this.ventaSeleccionada.precioPasaje = pasaje.precioPasaje;
    this.ventaSeleccionada.categoriaPasajero = pasaje.categoriaPasajero;
    this.ventaSeleccionada.dniPasajero = pasaje.dniPasajero;
    this.pasaje = pasaje;
    this.precioFinal = pasaje.precioPasaje;
  }

  eliminarOperacionVenta(pasaje: Pasaje) {
    swal.fire({
      title: 'Eliminar la venta?',
      text: 'Desea eliminar la venta del cliente con DNI ' + pasaje.dniPasajero.toString() + '?',
      icon: 'warning',
      showCancelButton: true,
      /*confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',*/
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.ventaPasajeService.deletePasajeVendido(pasaje);
        this.obtenerPasajesVendidos();
        this.limpiarCampos();
        swal.fire(
          'Venta Eliminada!',
          '',
          'success'
        );
      }
      else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Accion cancelada',
          '',
          'error'
        );
      }
    });
  }

  comprobarCamposNoNulos() {
    return (this.pasaje.dniPasajero != null && this.pasaje.categoriaPasajero != null && this.pasaje.precioPasaje != null);
  }
  habilitarModificacion() {
    this.realizarVenta = false;
    this.realizarModificacion = true;
  }

  habilitarVenta() {
    this.realizarVenta = true;
    this.realizarModificacion = false;
  }


  obtenerPasajesVendidos() {
    this.pasajesVendidos = this.ventaPasajeService.getPasajesVendidos();
  }

  limpiarCampos() {
    this.pasaje = new Pasaje();
  }


  /*Estadisticas*/
  mostrarEstadisticas() {
    this.estadisticas = true;
  }
  ocultarEstadisticas() {
    this.estadisticas = false;
  }


  /*Calculos*/
  calcularPrecioFinal() {
    if (this.pasaje.categoriaPasajero != null && this.pasaje.precioPasaje != null) {
      switch (this.pasaje.categoriaPasajero) {
        case 'm': {
          this.precioFinal = this.pasaje.precioPasaje - this.pasaje.precioPasaje * .25;
          break;
        }
        case 'a': {
          this.precioFinal = this.pasaje.precioPasaje;
          break;
        }
        case 'j': {
          this.precioFinal = this.pasaje.precioPasaje - this.pasaje.precioPasaje * .5;
          break;
        }
      }
    }
  }
}
