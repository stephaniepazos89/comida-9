import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CondicionService } from 'src/app/services/condicion.service'
import { RecetaService } from 'src/app/services/receta.service'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { CondicionAlimenticia } from 'src/domain/condicionAlimenticia'
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
  condiciones: CondicionAlimenticia[] = []
  

  constructor(
    public usuarioService: UsuarioService, 
    public condicionesService: CondicionService, 
    public recetaService: RecetaService, 
    private router: Router
    ) {  }


  ngOnInit() { 
    
    this.usuarioPerfil = this.usuarioService.getUsuario(0)
    this.todasLasRecetas = this.recetaService.getRecetas() 
    this.ultimasRecetas = this.recetaService.busquedaPorUsuario(this.usuarioPerfil.nombre)
    this.condiciones = this.condicionesService.getCondiciones()

    this.usuarioPerfil.agregarAlimentoDisgustado(new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
    this.usuarioPerfil.agregarAlimentoPreferido(new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))

    this.copiaUsuario = Object.assign({},this.usuarioPerfil)
    this.alimentosPreferidos = this.copiaUsuario.alimentosPreferidos
    this.alimentosDisgustados = this.copiaUsuario.alimentosDisgustados
    
  }

  irAHome(){
    this.router.navigate(['/busqueda'])
  }

  aceptar(){
    this.irAHome()
  }

  esSaludableTexto(){   //SE TIENE QUE ARREGLAR
    if (this.usuarioPerfil.esSaludable()) return "Estado Saludable"
    else return "Estado No Saludable"
  }

  eliminarReceta(receta: Receta) {
    this.ultimasRecetas.splice(this.ultimasRecetas.indexOf(receta), 1)
  }
}
