import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CondicionService } from 'src/app/services/condicion.service'
import { RecetaService } from 'src/app/services/receta.service'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { CondicionAlimenticia, Diabetico } from 'src/domain/condicionAlimenticia'
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio'
import { Receta } from 'src/domain/receta'
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
  ultimasRecetas: Receta[]
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
    

    this.condiciones = this.condicionesService.getCondiciones()

    // this.usuarioPerfil.agregarCondicion(this.condicionesService.getCondicion(0)) 
    // this.usuarioPerfil.agregarCondicion(this.condicionesService.getCondicion(1)) 
    
    this.listaDeRutinas = Object.keys(this.rutinas)
  }

   async ruteoDeUsuario(){
    if(!this.usuarioService.enEdicion){
      this.usuarioPerfil = await this.usuarioService.getUsuario(this.usuarioService.usuarioLogin.id)
      this.usuarioService.usuarioCopia = this.usuarioPerfil
    }else {
      this.usuarioPerfil = this.usuarioService.usuarioCopia
      this.usuarioService.enEdicion = false
      
    }

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
}
