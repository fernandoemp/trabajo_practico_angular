export class Palabra {

  public palabraIngles: string;
  public palabraEspaniol: string;
  public urlImagen: string;
  public categoria: string;

   Palabra(palabraIngles?: string, palabraEspaniol?: string, urlImagen?: string, categoria?: string) {
    this.palabraIngles = palabraIngles;
    this.palabraEspaniol = palabraEspaniol;
    this.urlImagen = urlImagen;
    this.categoria = categoria;
  }
}


