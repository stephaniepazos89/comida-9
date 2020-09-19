import { Component, OnInit } from '@angular/core';
import {AlimentoService} from 'src/app/Alimento.service'
import {Alimento} from 'src/domain/Alimento'

@Component({
  selector: 'app-Alimentos',
  templateUrl: './Alimentos.component.html',
  styleUrls: ['./Alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  alimentos: Alimento[]=[]

  constructor(public AlimentoService: AlimentoService) { }

  ngOnInit() {
    this.alimentos=this.AlimentoService.getAlimento()
  }

}
