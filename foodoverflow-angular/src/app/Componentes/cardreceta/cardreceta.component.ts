import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/domain/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-cardreceta',
  templateUrl: './cardreceta.component.html',
  styleUrls: ['./cardreceta.component.css']
})
export class CardrecetaComponent implements OnInit {
  recetas: Receta[] = []
  public recetaBuscada = ''

  constructor(public recetaService : RecetaService) { }

  ngOnInit(): void {
    this.recetas = this.recetaService.getRecetas();
  }

}
