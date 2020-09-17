import { Component, OnInit } from '@angular/core';
import { Receta } from '../../domain/receta';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-cardreceta',
  templateUrl: './cardreceta.component.html',
  styleUrls: ['./cardreceta.component.css']
})
export class CardrecetaComponent implements OnInit {
  recetas: Receta[] = []


  constructor(public recetaService : RecetaService) { }

  ngOnInit(): void {
    this.recetas = this.recetaService.getRecetas();
  }

}
