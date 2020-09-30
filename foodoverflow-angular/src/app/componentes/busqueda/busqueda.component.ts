import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  recetaBuscada = ''
  recetas: Receta[] = []
  mostrarBusqueda: Boolean
  isChecked: Boolean = false
  receta: Receta
  
  constructor(public recetaService : RecetaService, public usuarioService : UsuarioService, private router: Router) { }
  
  ngOnInit(): void {
  }

  realizarBusqueda(recetaBuscada): void{
   this.mostrarBusqueda = true
   
   if(!this.isChecked){
    this.recetas =  this.recetaService.busquedaCompleta(recetaBuscada)
   }else {
     this.recetas = this.recetaService.busquedaRecetaDeUnAutor(recetaBuscada, this.usuarioLogueado())
   }
   }

   usuarioLogueado(): Usuario{
     return this.usuarioService.usuarioLogueado()
   }

   nuevaReceta(){
     this.recetaService.crearRecetaVacia()
     this.receta = this.recetaService.recetaEditada
     this.router.navigate(['/receta', this.receta.id]);
   }

}
