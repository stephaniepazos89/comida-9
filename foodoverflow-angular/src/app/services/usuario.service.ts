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
  private usuarioLogin: Usuario
  public usuarioCopia: Usuario

  asignadorID: number = 0
  tipoAlimento: number;

  constructor(private http: HttpClient) {
    this.usuarios = [
      this.crearUsuario("Eduardo", 94, 1.60)
    //   this.crearUsuario("Pedro", 80, 1.56),
    //   this.crearUsuario("Fernando", 65, 1.60),
    //   this.crearUsuario("Nahuel", 60, 1.72)
    ]

  }

  async getUsuario(iDusuario) {
    const usuario = await this.http.post<Usuario>(REST_SERVER_URL + '/perfil', JSON.stringify(iDusuario)).toPromise()
    return Usuario.fromJson(usuario)
  }
  usuarioLogueado(): Usuario {
    this.usuarioLogin = this.getUsuarioLogueado(0)
    return this.usuarioLogin
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

  modificarUsuario(usuario: Usuario) {
    this.usuarios.splice(usuario.id, 1, usuario)
    console.log(usuario.id)
  }

  
  
}
