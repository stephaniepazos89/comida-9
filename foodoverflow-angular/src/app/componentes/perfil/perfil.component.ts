import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CondicionService } from 'src/app/services/condicion.service'
import { RecetaService } from 'src/app/services/receta.service'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { CondicionAlimenticia, Diabetico } from 'src/domain/condicionAlimenticia'
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio'
import { Receta, RecetaBusquedaAutor } from 'src/domain/receta'
import { Rutina } from 'src/domain/rutina'
import { Usuario } from 'src/domain/usuario'
import * as _ from "lodash"


function mostrarError(component, error) {
  const errorMessage = (error.status === 0) ? 'Problemas de conexion con backend' : error.error
  component.errors.push(errorMessage)
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioPerfil: Usuario 
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]
  recetasDeUsuario: Receta[]
  condiciones: CondicionAlimenticia[] = []
  preferido: number = 1
  disgustado: number = 0
  rutinas = Rutina
  listaDeRutinas = []

  constructor(public usuarioService: UsuarioService, public condicionesService: CondicionService, public recetaService: RecetaService, private router: Router ) {}


  async ngOnInit() { 
    try{
      await this.inicializacionDeUsuario()
    } catch (error) {
      mostrarError(this, error)
    }
  }

  async inicializacionDeUsuario(){

    await this.ruteoDeUsuario()
    console.log(this.usuarioPerfil.condicionesAlimenticias)
    this.condiciones = this.condicionesService.getCondiciones()
    this.listaDeRutinas = Object.keys(this.rutinas)
    await this.getRecetasDeUsuario()
  }

   async ruteoDeUsuario(){
    if(!this.usuarioService.enEdicion){
      this.usuarioService.usuarioLogin
      this.usuarioPerfil = this.usuarioService.usuarioLogin
    } else {
      this.usuarioPerfil = this.usuarioService.usuarioLogin
      this.usuarioService.enEdicion = false
    }

    //this.usuarioPerfil.condicionesAlimenticias = []
    this.condicionesService.crearCondicionesdeUsuario(this.usuarioService.usuarioLogin, this.usuarioPerfil)
    console.log(this.usuarioPerfil)
  }


  irAHome(){
    this.router.navigate(['/busqueda'])
  }

  async aceptar(){
    await this.usuarioService.modificarUsuario(this.usuarioPerfil)
    this.irAHome()
  }

  esSaludableTexto(){   
    if (this.usuarioPerfil.esSaludable()) return "Estado Saludable"
    else return "Estado No Saludable"
  }

  eliminarReceta(receta: Receta) {
    this.recetasDeUsuario.splice(this.recetasDeUsuario.indexOf(receta), 1)
  }

  agregarCondicion(condicion: CondicionAlimenticia) {
    if (!(this.tieneCondicion(condicion))) {
      this.usuarioPerfil.agregarCondicion(condicion)
      console.log(this.usuarioPerfil.condicionesAlimenticias)
    }    
    else this.usuarioPerfil.quitarCondicion(condicion)
  }

  tieneCondicion(condicion: CondicionAlimenticia): boolean {
     
    return this.usuarioPerfil.condicionesAlimenticias.map(condicion => condicion.nombre).includes(condicion.nombre)
  }

  async getRecetasDeUsuario(){
    let busqueda = new RecetaBusquedaAutor("",this.usuarioPerfil.nombreYApellido)
     this.recetasDeUsuario = await this.recetaService.busquedaRecetaDeUnAutor(busqueda)
  }
}
