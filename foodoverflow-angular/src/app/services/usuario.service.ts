import { Injectable } from '@angular/core';
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[]
  private usuarioLogin: Usuario = new Usuario(1,"German", 70, 1.50)

  asignadorID: number = 1

  constructor() {
    this.usuarios = [
      this.crearUsuario("German", 94, 1.60),
      this.crearUsuario("Pedro", 80, 1.56),
      this.crearUsuario("Fernando", 65, 1.60),
      this.crearUsuario("Nahuel", 60, 1.72)
    ]
  }

  usuarioLogueado(): Usuario {
    return this.usuarioLogin
  }
  crearUsuario(nombre:string, peso: number, estatura: number){
    const usuario = new Usuario(this.asignadorID, nombre, peso, estatura)
    this.asignadorID++
    return usuario

  }

  getUsuario(posicion: number){
    return this.usuarios[posicion]
  }

  getUsuarioByID(id:number){
    return this.usuarios.find((receta) => {
      return receta.id == id
    })
  }
}
