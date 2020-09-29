import { Component, Input, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/services/receta.service';
import { Dificultad } from 'src/domain/dificultad';
import { Receta } from 'src/domain/receta';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-cardreceta',
  templateUrl: './cardreceta.component.html',
  styleUrls: ['./cardreceta.component.css']
})
export class CardrecetaComponent implements OnInit {
  @Input() resultado: ResultadosComponent
  @Input() receta: Receta
  dificultades: Dificultad

  constructor(public recetaService : RecetaService) { }

  ngOnInit(): void {
  }
  
  eliminar(){
    this.recetaService.eliminarReceta(this.receta)
    this.resultado.eliminarReceta(this.receta)
    }
}
