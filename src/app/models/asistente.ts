export class Asistente {
  usuario: string;
  nombreOrganizacion: string;
  solicitaConstancia: boolean;


  Asistente(usuario?: string, nombreOrganizacion?: string, solicitaConstancia?: boolean){
    this.usuario = usuario;
    this.nombreOrganizacion = nombreOrganizacion;
    this.solicitaConstancia = solicitaConstancia;
  }
}
