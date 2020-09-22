import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/domain/receta';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  recetaBuscada = 'German'
  recetas: Receta[] = []

  constructor(public recetaService : RecetaService) { }
  
  ngOnInit(): void {
    this.recetas = this.recetaService.getRecetas();
  }

  realizarBusqueda(){
   // this.cardReceta.recetaBuscada = this.recetaBuscada
  }
}
