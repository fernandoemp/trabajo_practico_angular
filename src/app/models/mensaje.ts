export class Mensaje {
  para: number;
  de: number;
  fecha: Date;
  texto: string;

  Mensaje(para?: number, de?: number, fecha?: Date, texto?: string){

    this.para = para;
    this.de = de;
    this.fecha = fecha;
    this.texto = texto;
  }
}
