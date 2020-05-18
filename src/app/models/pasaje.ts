export class Pasaje {
  dniPasajero: number;
  categoriaPasajero: string;
  precioPasaje: number;
  fechaCompra: Date;


    Pasaje(dniPasajero?: number, precioPasaje?: number, categoriaPasajero?: string, fechaCompra?: Date){
      this.dniPasajero = dniPasajero;
      this.precioPasaje = precioPasaje;
      this.categoriaPasajero = categoriaPasajero;
      this.fechaCompra = fechaCompra;
    }
}
