import { Component, Input, OnInit } from '@angular/core';
import { Receta } from 'src/domain/receta';

@Component({
  selector: 'app-cardreceta',
  templateUrl: './cardreceta.component.html',
  styleUrls: ['./cardreceta.component.css']
})
export class CardrecetaComponent implements OnInit {
  
  @Input() receta: Receta

  constructor() { }

  ngOnInit(): void {
  }

}
