import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentoService } from 'src/app/services/alimento.service'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alimento } from 'src/domain/alimento'
import { Usuario } from 'src/domain/usuario';
import { TablaAlimentosComponent } from '../tabla-alimentos/tabla-alimentos.component';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {
  usuario: Usuario 
  nombreTabla: String = 'Alimento'
  alimentos: Alimento[] = []

  @ViewChild(TablaAlimentosComponent) childAlimento;

  constructor(public alimentoService: AlimentoService, public usuarioService: UsuarioService,  private router: Router, private route: ActivatedRoute) {   }

  //recibo una promesa alimento por eso es asincronico
  async ngOnInit() {
    this.usuario =  this.usuarioService.usuarioLogin
    this.alimentos = await this.alimentoService.getAlimentos()
  }

  irAHome(){
    this.router.navigate(['/perfil'])
  }

  aceptar(){
    
    if(this.usuarioService.tipoAlimento == 1){
      this.usuario.agregarAlimentoPreferido(this.childAlimento.alimentoSeleccionado)
       
    }else{
      this.usuario.agregarAlimentoDisgustado(this.childAlimento.alimentoSeleccionado) 
    }
    this.irAHome()
    
  }

  cancelar(){
    this.irAHome()
  }
}
