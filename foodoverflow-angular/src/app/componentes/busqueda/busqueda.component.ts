import { Component, OnInit } from '@angular/core';
import { CardrecetaComponent } from '../cardreceta/cardreceta.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  recetaBuscada = ''

  constructor() { }
//public cardReceta: CardrecetaComponent
  ngOnInit(): void {
  }

  realizarBusqueda(){
   // this.cardReceta.recetaBuscada = this.recetaBuscada
  }
}
