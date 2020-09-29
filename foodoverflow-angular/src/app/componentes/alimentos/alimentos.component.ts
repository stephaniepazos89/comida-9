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


  constructor(public alimentoService: AlimentoService, public usuarioService: UsuarioService,  private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.usuario = this.usuarioService.getUsuarioByID(params.id)
      this.alimentosDeUsuario = params.listaDeAlimentos
      if (!this.usuario){
        this.irAOrigen()
      }
    })
   }

   irAOrigen() {
    this.router.navigate(['/' + this.destinoNavigate])
  }

  ngOnInit() {
    this.alimentos=this.alimentoService.getAlimento()
  }

}
