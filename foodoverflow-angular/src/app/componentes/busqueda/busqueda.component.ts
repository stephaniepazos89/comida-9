import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/domain/receta';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  recetaBuscada = ''
  recetas: Receta[] = []
  mostrarBusqueda: Boolean

  constructor(public recetaService : RecetaService) { }
  
  ngOnInit(): void {
  }

  realizarBusqueda(recetaBuscada): void{
   this.mostrarBusqueda = true
   this.recetas =  this.recetaService.busquedaCompleta(recetaBuscada)
   }


}
