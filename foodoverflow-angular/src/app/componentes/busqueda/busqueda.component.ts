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
   this.recetas =  this.recetaService.getRecetas().filter(receta => !recetaBuscada || this.coincidencia(receta.nombreDelPlato, recetaBuscada) || this.coincidencia(receta.autor.nombre, recetaBuscada) )
  }

  coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }
}
