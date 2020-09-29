import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentoService } from 'src/app/services/alimento.service';
import { Alimento } from 'src/domain/alimento';

@Component({
  selector: 'app-tabla-alimentos',
  templateUrl: './tabla-alimentos.component.html',
  styleUrls: ['./tabla-alimentos.component.css']
})
export class TablaAlimentosComponent implements OnInit {

  @Input() nombreTabla:string
  
  alimentos: Alimento[]=[]

  constructor(public alimentoService: AlimentoService) { }

  ngOnInit() {
    this.alimentos = this.alimentoService.getAlimento()
    console.log(this.alimentos)
  }

  
}
