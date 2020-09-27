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


  constructor(public alimentoService: AlimentoService, public usuarioService: UsuarioService,  private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.usuario = this.usuarioService.getUsuarioByID(params.id)
      if (!this.usuario){
        this.irAHome()
      }
    })
   }

   irAHome(){
    this.router.navigate(['/busqueda'])
  }

  ngOnInit() {
    this.alimentos=this.alimentoService.getAlimento()
  }

}
