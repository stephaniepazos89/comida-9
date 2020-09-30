import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CondicionService } from 'src/app/services/condicion.service'
import { RecetaService } from 'src/app/services/receta.service'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { CondicionAlimenticia } from 'src/domain/condicionAlimenticia'
import { Receta } from 'src/domain/receta'
import { Usuario } from 'src/domain/usuario'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioPerfil: Usuario 
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]
  ultimasRecetas: Receta[]
  condiciones: CondicionAlimenticia[] = []
  preferido: number = 1
  disgustado: number = 0
  

  constructor(public usuarioService: UsuarioService, public condicionesService: CondicionService, public recetaService: RecetaService, private router: Router ) {}


  ngOnInit() { 
    this.inicializacionDeUsuario()
  }

  inicializacionDeUsuario(){
    this.usuarioService.usuarioCopia = Object.assign(new Usuario(),this.usuarioService.usuarioLogueado())
    this.usuarioPerfil = this.usuarioService.usuarioCopia
    this.ultimasRecetas = this.recetaService.busquedaPorUsuario(this.usuarioPerfil.nombre)
    this.condiciones = this.condicionesService.getCondiciones()
    this.alimentosPreferidos = this.usuarioPerfil.alimentosPreferidos
    this.alimentosDisgustados = this.usuarioPerfil.alimentosDisgustados
  }

  irAHome(){
    this.router.navigate(['/busqueda'])
  }

  aceptar(){
    this.usuarioService.modificarUsuario(this.usuarioPerfil)
    this.irAHome()
  }

  esSaludableTexto(){   //SE TIENE QUE ARREGLAR
    if (this.usuarioPerfil.esSaludable()) return "Estado Saludable"
    else return "Estado No Saludable"
  }

  eliminarReceta(receta: Receta) {
    this.ultimasRecetas.splice(this.ultimasRecetas.indexOf(receta), 1)
  }
}
