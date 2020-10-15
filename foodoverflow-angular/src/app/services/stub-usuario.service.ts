import { Injectable } from '@angular/core';
import { Usuario } from 'src/domain/usuario';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio';


@Injectable({
  providedIn: 'root'
})
export class StubUsuarioService {

  public enEdicion: boolean
  private usuarios: Usuario[]
  public usuarioLogin: Usuario

  asignadorID: number = 0

  constructor() { 
    this.usuarios = [
      this.crearUsuario("German", 65, 1.85),
      this.crearUsuario("Lucas", 70, 1.67)
  ]
  this.usuarioLogin = this.usuarioLogueado()
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

  usuarioLogueado() : Usuario{
    return this.usuarios[0]
  }

  getUsuarioByID(id:number){
    return this.usuarios.find((receta) => {
      return receta.id == id
    })
  }
}
