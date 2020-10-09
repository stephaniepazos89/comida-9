import { Injectable } from '@angular/core';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio';
import { Usuario } from 'src/domain/usuario';

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

  constructor() {
    this.usuarios = [
      this.crearUsuario("Eduardo", 94, 1.60),
      this.crearUsuario("Pedro", 80, 1.56),
      this.crearUsuario("Fernando", 65, 1.60),
      this.crearUsuario("Nahuel", 60, 1.72)
    ]

  }

  usuarioLogueado(): Usuario {
    this.usuarioLogin = this.getUsuario(0)
    return this.usuarioLogin
  }

  crearUsuario(nombre:string, peso: number, estatura: number){
    const usuario = new Usuario(this.asignadorID, nombre, peso, estatura)
    this.asignadorID++
    usuario.agregarAlimentoDisgustado(new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
    usuario.agregarAlimentoPreferido(new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
    return usuario

  }

  public getUsuarios(){
    return this.usuarios
  }

  getUsuario(posicion: number){
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
