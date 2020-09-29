import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentoService } from 'src/app/services/alimento.service'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alimento } from 'src/domain/alimento'
import { Usuario } from 'src/domain/usuario';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {
  nombreTabla: String = 'Alimento'
  alimentos: Alimento[]=[]
  usuario: Usuario
  alimentosDeUsuario: Alimento[]
  destinoNavigate:string = 'perfil'
  alimentoParaAgregar: Alimento

  constructor(public alimentoService: AlimentoService, public usuarioService: UsuarioService,  private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.usuario = this.usuarioService.getUsuarioByID(params.id)
      this.alimentosDeUsuario = params.listaDeAlimentos
      if (!this.usuario){
        this.irAOrigen()
      }
    })
   }

  ngOnInit() {
    this.alimentos=this.alimentoService.getAlimento()
  }

  alimentoRecibido($event: Alimento) {
    
    this.alimentoParaAgregar = $event 
    console.log("Se recibe  " + this.alimentoParaAgregar.nombreDeAlimento)
  }
  
  irAOrigen() {
    this.router.navigate(['/' + this.destinoNavigate])
  }

  aceptar() {
    
    this.router.navigate(['/' + this.destinoNavigate, this.alimentoParaAgregar])
  }
}
