import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentoService } from 'src/app/services/alimento.service'
import { RecetaService } from 'src/app/services/receta.service';
import { Alimento } from 'src/domain/alimento'
import { Ingrediente } from 'src/domain/ingrediente';
import { Receta } from 'src/domain/receta';
import { TablaAlimentosComponent } from '../tabla-alimentos/tabla-alimentos.component';


@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {

  @ViewChild(TablaAlimentosComponent) childAlimento;

  nombreTabla: String = 'Alimento'
  alimentos: Alimento[]=[]
  receta: Receta = this.recetaService.recetaEditada
  cantidad: number


  constructor(public alimentoService: AlimentoService, public router: Router, public route: ActivatedRoute, private recetaService: RecetaService ) { }

  ngOnInit() {
    this.alimentos=this.alimentoService.getAlimento()
  }

  irAReceta(){
    this.router.navigate(['/receta', this.receta.id])
  }

  aceptar(){
    this.receta.agregarIngrediente(new Ingrediente(this.childAlimento.alimentoSeleccionado, this.cantidad))
    this.irAReceta()
  }
  cancelar(){
    this.irAReceta()
  }
}

