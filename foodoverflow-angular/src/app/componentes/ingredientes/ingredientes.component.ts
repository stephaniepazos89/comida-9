import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  nombreTabla: String = 'Ingrediente'
  constructor() { }

  ngOnInit() {
  }

}
