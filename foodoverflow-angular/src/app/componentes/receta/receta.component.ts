import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { Ingrediente } from 'src/domain/ingrediente';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta: Receta
  calorias: number

  constructor(private recetaService: RecetaService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.receta = this.recetaService.getTareaByName(params['nombreDelPlato'])
      if (!this.receta){
        this.irAHome()
      }
    })
  }

  ngOnInit(): void {
    this.calorias = this.receta.calorias
    this.receta.listaColaboradores.push(new Usuario ("Jorgito", 180, 1.80))
    this.receta.listaColaboradores.push(new Usuario ("Jorgito", 180, 1.80))
    this.receta.listaColaboradores.push(new Usuario ("Jorgito", 180, 1.80))
    this.receta.listaIngredientes.push(new Ingrediente(new Alimento("Papa", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS), 500))
    this.receta.listaIngredientes.push(new Ingrediente(new Alimento("Papa", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS), 500))
  }

  irAHome(){
    this.router.navigate(['/busqueda'])
  }

  aceptar(){
    this.receta.calorias = this.calorias
    this.irAHome()
  }

  cancelar(){
    this.irAHome()
  }
}
