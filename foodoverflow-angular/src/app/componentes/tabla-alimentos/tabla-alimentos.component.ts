import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { AlimentoService } from 'src/app/services/alimento.service';
import { Alimento } from 'src/domain/alimento';

@Component({
  selector: 'app-tabla-alimentos',
  templateUrl: './tabla-alimentos.component.html',
  styleUrls: ['./tabla-alimentos.component.css']
})
export class TablaAlimentosComponent implements OnInit {

  alimentoSeleccionado: Alimento
  @Input() nombreTabla: string
  
  alimentos: Alimento[] = []

  constructor(public alimentoService: AlimentoService) { }

  ngOnInit() {
    this.alimentos = this.alimentoService.getAlimento()
  }

  seleccionarAlimento(alimento: Alimento) {
    this.alimentoSeleccionado = alimento
  }


}
