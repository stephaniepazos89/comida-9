import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentoService } from 'src/app/services/alimento.service'
import { Alimento } from 'src/domain/alimento'
import { TablaAlimentosComponent } from '../tabla-alimentos/tabla-alimentos.component';


@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {

  @ViewChild(TablaAlimentosComponent) alimento;

  nombreTabla: String = 'Alimento'
  alimentos: Alimento[]=[]
  alimentoChild:any;
 


  constructor(public AlimentoService: AlimentoService, public router: Router, public route: ActivatedRoute ) { }

  ngOnInit() {
    this.alimentos=this.AlimentoService.getAlimento()
  }

  ngAfterViewInit() {
    this.alimentoChild=this.alimento;
  }

  irAHome(){
    this.router.navigate(['/perfil/'])
  }

  aceptar(){
    console.log(this.alimentoChild.alimento)
    this.irAHome()
  }
  cancelar(){
    this.irAHome()
  }
}

