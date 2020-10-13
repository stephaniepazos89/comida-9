import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Ingrediente } from 'src/domain/ingrediente';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { Dificultad } from 'src/domain/dificultad'
import { RoutingService } from 'src/app/services/routing.service';

function mostrarError(component, error) {
  const errorMessage = (error.status === 0) ? 'Problemas de conexion con backend' : error.error
  component.errors.push(errorMessage)
}

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta: Receta
  dificultades = Dificultad
  enumDificultades = []
  esNueva: boolean
  enEdicion: boolean 
  listadoInadecuados: String [] 
  errors = []
  errorMessage : string
  vistaEdicion = this.recetaService.vistaEdicion

  constructor(private recetaService: RecetaService, private router: Router, private route: ActivatedRoute, private routingService: RoutingService) { }


  async ngOnInit() {
    
    try {
      await this.observableRouting()
      this.enumDificultades = Object.values(this.dificultades)
      
    } catch (error) {
      mostrarError(this, error)
    }
  
  }

  async observableRouting(){
    const idReceta = this.route.snapshot.params['id']
    
      if (idReceta > 0){
        await this.ruteoRecetaExistente(idReceta)
      }else{
        this.ruteoNuevaReceta()
      }
    
  }

  ruteoNuevaReceta(){
    if(!this.recetaService.enEdicion){
      this.recetaService.crearRecetaVacia()
      this.receta = this.recetaService.recetaEditada
    }else{
      this.receta = this.recetaService.recetaEditada
      this.recetaService.enEdicion = false
    }
    this.esNueva = true
  }

  async ruteoRecetaExistente(idReceta){
    if(!this.recetaService.enEdicion){
      this.receta = await this.recetaService.getRecetaByID(idReceta)
      this.recetaService.recetaEditada = this.receta
    }else {
      this.receta = this.recetaService.recetaEditada
      this.recetaService.enEdicion = false
    }
    this.esNueva = false
  }

  irAHome(){
    this.router.navigate([this.routingService.rutaAnteriorEstricta.value])
  }

  async aceptar(){
    try {
      if(this.receta.esValida()){
        if(this.esNueva){
          await this.aceptarNueva()
        }else{
          await this.aceptarModificacion()
        }

        this.irAHome()
      }else{
        this.errorMessage = "Debe llenar al menos un paso, un ingrediente, y calorias entre 10 y 5000"
      }

    } catch (e) {
      this.errors.push(e.error)
    }
  }

  async aceptarNueva(){
      await this.recetaService.agregarReceta(this.receta)
  }

  async aceptarModificacion(){
    await this.recetaService.modificarReceta(this.receta)
  }

  cancelar(){
    this.irAHome()
  }

  agregarIngrediente(){
    this.recetaService.enEdicion = true
    this.router.navigate(['/ingrediente']);
  }
  
  agregarColaborador(){
    this.recetaService.enEdicion = true
    this.router.navigate(['/colaborador'])
  }

  agregarPaso(){
    this.recetaService.enEdicion = true
    this.router.navigate(['/pasos'])
  }

  eliminarPaso(paso: string){
    this.receta.listaDePasos.splice(this.receta.listaDePasos.indexOf(paso), 1)  
  }

  eliminarIngrediente(ingrediente: Ingrediente){
    this.receta.listaDeIngredientes.splice(this.receta.listaDeIngredientes.indexOf(ingrediente), 1)
  }

  eliminarColaborador(colaborador: Usuario){
    this.receta.listaDeColaboradores.splice(this.receta.listaDeColaboradores.indexOf(colaborador), 1)
  }

}
