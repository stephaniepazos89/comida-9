import { Component, Input, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/services/receta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Dificultad } from 'src/domain/dificultad';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-cardreceta',
  templateUrl: './cardreceta.component.html',
  styleUrls: ['./cardreceta.component.css']
})
export class CardrecetaComponent implements OnInit {
  @Input() resultado: ResultadosComponent
  @Input() receta: Receta
  dificultades: Dificultad
  usuarioLogueado : Usuario

  constructor(public usuarioService: UsuarioService ,public recetaService : RecetaService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.usuarioService.usuarioLogin
  }
  
  eliminar(receta){
    this.recetaService.eliminarReceta(receta)
    this.resultado.eliminarReceta(receta)
    }
}
