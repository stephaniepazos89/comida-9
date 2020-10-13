import { Injectable } from '@angular/core';
import { Usuario } from 'src/domain/usuario';
import { REST_SERVER_URL } from './configuracion'
import { HttpClient } from '@angular/common/http';

export interface IUsuarioService {

  getUsuario(IDusuario): Promise<Usuario>
  modificarUsuario(usuario: Usuario): Promise<void>
  getUsuarios()
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService{
  public enEdicion: boolean
  private usuarios: Usuario[]
  public usuarioLogin: Usuario
  public usuarioCopia: Usuario

  asignadorID: number = 0
  tipoAlimento: number;

  constructor(private http: HttpClient) {}

  async getUsuario(IDusuario) {
    const usuario = await this.http.post<Usuario>(REST_SERVER_URL + '/perfil', JSON.stringify(IDusuario)).toPromise()
    return Usuario.fromJson(usuario)
  }


  async modificarUsuario(usuario: Usuario) {
    await this.http.put(REST_SERVER_URL + '/perfil', usuario.toJSON()).toPromise()
  }
    
  async getUsuarios(){
    const usuarios = await this.http.get<Usuario[]>(REST_SERVER_URL + '/usuarios').toPromise()
    return usuarios.map((usuario) => Usuario.fromJson(usuario))
  }


  async loguearUsuario(busqueda) {
    const usuario = await this.http.post<Usuario>(REST_SERVER_URL + '/login', JSON.stringify(busqueda)).toPromise()
    if(usuario !== null){
      this.usuarioLogin = Usuario.fromJson(usuario)
      return true
    } else{
      return false
    }
  }
}
