import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Ingrediente } from 'src/domain/ingrediente';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { Dificultad } from 'src/domain/dificultad'
import { RoutingService } from 'src/app/services/routing.service';


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

  
  constructor(private recetaService: RecetaService, private router: Router, private route: ActivatedRoute, private routingService: RoutingService) { }


  ngOnInit(): void {

    this.observableRouting()
    this.enumDificultades = Object.keys(this.dificultades)
  }

  observableRouting(){
    this.route.params.subscribe(params =>{
      if (params.id >= 0){
        this.ruteoRecetaExistente(params.id)
      }else{
        this.ruteoNuevaReceta()
      }
    })
  }

  ruteoNuevaReceta(){
    this.receta = this.recetaService.recetaEditada
    this.esNueva = true
  }

  ruteoRecetaExistente(idReceta){
    this.recetaService.recetaEditada = Object.assign(new Receta(),this.recetaService.getRecetaByID(idReceta))
    this.receta = this.recetaService.recetaEditada
    this.esNueva = false

  }

  irAHome(){
    this.router.navigate([this.routingService.rutaAnteriorEstricta.value])
  }

  aceptar(){
    if(!this.esNueva){
      this.recetaService.modificarReceta(this.receta)
    } else { 
      this.recetaService.agregarReceta(this.receta)
    }
      this.irAHome()
  }

  cancelar(){
    this.irAHome()
  }

  agregarIngrediente(){
    this.router.navigate(['/ingrediente']);
  }

  eliminarPaso(paso: string){
    this.receta.listaPasos.splice(this.receta.listaPasos.indexOf(paso), 1)  
  }

  eliminarIngrediente(ingrediente: Ingrediente){
    this.receta.listaIngredientes.splice(this.receta.listaIngredientes.indexOf(ingrediente), 1)
  }

  eliminarColaborador(colaborador: Usuario){
    this.receta.listaColaboradores.splice(this.receta.listaColaboradores.indexOf(colaborador), 1)
  }

}
