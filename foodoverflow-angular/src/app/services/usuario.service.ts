import { Injectable } from '@angular/core';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio';
import { Usuario } from 'src/domain/usuario';
import { REST_SERVER_URL } from './configuracion'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public enEdicion: boolean
  private usuarios: Usuario[]
  public usuarioLogin: Usuario
  public usuarioCopia: Usuario

  asignadorID: number = 0
  tipoAlimento: number;

  constructor(private http: HttpClient) {
    this.usuarios = [
      this.crearUsuario("Eduardo", 94, 1.60)
    ]

  }

  async getUsuario(IDusuario) {
    const usuario = await this.http.post<Usuario>(REST_SERVER_URL + '/perfil', JSON.stringify(IDusuario)).toPromise()
    return Usuario.fromJson(usuario)
  }

  async modificarUsuario(usuario: Usuario) {
    await this.http.put(REST_SERVER_URL + '/perfil', usuario.toJSON()).toPromise()
  }

  async fetchUsuarioLogueado() {
    this.usuarioLogin = await this.getUsuario(2)
    console.log(this.usuarioLogin)
  }

  crearUsuario(nombre:string, peso: number, estatura: number){
    const usuario = new Usuario(this.asignadorID, nombre, peso, estatura)
    this.asignadorID++
    usuario.id = 2
    // usuario.agregarAlimentoDisgustado(new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
    // usuario.agregarAlimentoPreferido(new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
    return usuario

  }

  public getUsuarios(){
    return this.usuarios
  }

  getUsuarioLogueado(posicion: number){
    return this.usuarios[posicion]
  }

  getUsuarioByID(id:number){
    return this.usuarios.find((receta) => {
      return receta.id == id
    })
  }
  
}
