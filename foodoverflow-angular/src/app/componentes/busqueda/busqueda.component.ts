import { Component, OnInit } from '@angular/core';
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
  constructor(public recetaService : RecetaService, public usuarioService : UsuarioService) { }
  
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


}
