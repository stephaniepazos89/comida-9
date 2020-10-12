import { Injectable } from '@angular/core';
import { Usuario } from 'src/domain/Usuario';

@Injectable({
  providedIn: 'root'
})
export class StubUsuarioService {

  public enEdicion: boolean
  private usuarios: Usuario[]
  public usuarioLogin: Usuario
  public usuarioCopia: Usuario

  asignadorID: number = 0

  constructor() { 
    this.usuarios = [
      this.crearUsuario("Eduardo", 94, 1.60),
      this.crearUsuario("German", 65, 1.85),
      this.crearUsuario("Tomas", 78, 1.62)
  ]
}

  crearUsuario(nombre:string, peso: number, estatura: number){
    const usuario = new Usuario(this.asignadorID, nombre, peso, estatura)
    this.asignadorID++
    return usuario
  }

  getUsuario(posicion: number){
    return this.usuarios[posicion]
  }

  modificarUsuario(usuario: Usuario){
    this.usuarios.splice(usuario.id+1, 1, usuario)
  }

  getUsuarios(){
    return this.usuarios
  }

  fetchUsuarioLogueado(){
    this.usuarioLogin = this.getUsuario(1)
  }

  loguearUsuario(busqueda){}

  getUsuarioByID(id:number){
    return this.usuarios.find((receta) => {
      return receta.id == id
    })
  }
}
