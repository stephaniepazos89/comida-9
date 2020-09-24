import { Injectable } from '@angular/core';
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[]

  constructor() {
    this.usuarios = [
      new Usuario("German", 94, 1.60),
      new Usuario("Pedro", 80, 1.56),
      new Usuario("Fernando", 65, 1.60),
      new Usuario("Nahuel", 60, 1.72)
    ]
  }

  getUsuario(posicion: number){
    return this.usuarios[posicion]
  }
}
