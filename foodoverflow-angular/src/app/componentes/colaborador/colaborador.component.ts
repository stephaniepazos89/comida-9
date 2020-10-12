import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  receta: Receta = this.recetaService.recetaEditada
  colaboradores = []
  seleccionado: Usuario
  

  constructor(private usuarioService: UsuarioService, private recetaService: RecetaService, private router: Router) {
   }

  async ngOnInit() {
    this.colaboradores = await this.usuarioService.getUsuarios()
  }

  seleccion(colaborador){
    this.seleccionado = colaborador
  }

  aceptar(){
    if(this.seleccionado){
      this.receta.agregarColaborador(this.seleccionado)
    }
      this.irAReceta()
  }

  cancelar(){
    this.irAReceta()
  }

  irAReceta(){
    this.router.navigate(['/receta', this.receta.id])
  }

}
