import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/domain/receta';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta: Receta
  recetaCopia: Receta
  
  constructor(private recetaService: RecetaService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.receta = Object.assign({},this.recetaService.getRecetaByID(params['id']))
      if (!this.receta){
        this.irAHome()
      }
    })
  }

  ngOnInit(): void {
  }


  irAHome(){
    this.router.navigate(['/busqueda'])
  }

  aceptar(){
    this.recetaService.modificarReceta(this.receta)
    this.irAHome()
  }

  cancelar(){
    this.irAHome()
  }

}
