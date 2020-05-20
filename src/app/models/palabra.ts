export class Palabra {

  public palabraIngles: string;
  public palabraEspaniol: string;
  public urlImagen: string;
  public categoria: string;
  public jugado: boolean;

   Palabra(palabraIngles?: string, palabraEspaniol?: string, urlImagen?: string, categoria?: string, jugado?: boolean) {
    this.palabraIngles = palabraIngles;
    this.palabraEspaniol = palabraEspaniol;
    this.urlImagen = urlImagen;
    this.categoria = categoria;
    this.jugado = jugado;
  }
}


