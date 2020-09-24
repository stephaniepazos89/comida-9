import { Component, OnInit } from '@angular/core'
import { RecetaService } from 'src/app/services/receta.service'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio'
import { Receta } from 'src/domain/receta'
import { Usuario } from 'src/domain/usuario'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioPerfil: Usuario
  copiaUsuario: Usuario
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]
  ultimasRecetas: Receta[]
  todasLasRecetas: Receta[] // Lo agregué sólo como prueba 

  constructor(public usuarioService: UsuarioService, public recetaService: RecetaService) {  }


  ngOnInit() { 
    
    this.usuarioPerfil = this.usuarioService.getUsuario(0)
    this.todasLasRecetas = this.recetaService.getRecetas() 
    this.ultimasRecetas = this.recetaService.busquedaPorUsuario(this.usuarioPerfil.nombre)

    this.usuarioPerfil.agregarAlimentoDisgustado(new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
    this.usuarioPerfil.agregarAlimentoPreferido(new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))

    this.copiaUsuario = Object.assign({},this.usuarioPerfil)
    this.alimentosPreferidos = this.copiaUsuario.alimentosPreferidos
    this.alimentosDisgustados = this.copiaUsuario.alimentosDisgustados
    
  }
}
