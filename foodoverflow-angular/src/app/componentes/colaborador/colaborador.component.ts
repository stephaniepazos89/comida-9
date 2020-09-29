import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  colaboradores = []

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.colaboradores = this.usuarioService.getUsuarios()
  }

}
