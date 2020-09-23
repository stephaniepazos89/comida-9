import { Component, OnInit } from '@angular/core'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio'
import { Usuario } from 'src/domain/usuario'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioPerfil: Usuario
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]

  constructor(public usuarioService: UsuarioService) {  }

  ngOnInit() { 

    this.usuarioPerfil = this.usuarioService.getUsuario(0)
    this.usuarioPerfil.agregarAlimentoDisgustado(new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
    this.usuarioPerfil.agregarAlimentoPreferido(new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
    this.alimentosPreferidos = this.usuarioPerfil.alimentosPreferidos
    this.alimentosDisgustados = this.usuarioPerfil.alimentosDisgustados
  }
}
