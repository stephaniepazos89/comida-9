import { Component, OnInit } from '@angular/core';
import { AlimentoService } from 'src/app/services/alimento.service'
import { Alimento } from 'src/domain/alimento'

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  alimentos: Alimento[]=[]

  constructor(public AlimentoService: AlimentoService) { }

  ngOnInit() {
    this.alimentos=this.AlimentoService.getAlimento()
  }

}
