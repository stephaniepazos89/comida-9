import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { Usuario } from 'src/domain/usuario'

@Component({
  selector: 'app-alimentosperfil',
  templateUrl: './alimentosperfil.component.html',
  styleUrls: ['./alimentosperfil.component.scss']
})
export class AlimentosperfilComponent implements OnInit {
 
  @Input() titulo: string
  @Input() listaDeAlimentos: Alimento[]
  @Input() usuario: Usuario
  alimentoRecibido: Alimento

  constructor(private router: Router, public usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.alimentoRecibido = params.alimentoParaAgregar
    })
  }

  ngOnInit() {
    //this.listaDeAlimentos.push(this.alimentoRecibido)
  }

  goToAlimento(){
    this.router.navigate(['/alimento', this.usuario.id, this.listaDeAlimentos])
  }

  eliminarAlimento(alimento: Alimento){
    this.listaDeAlimentos.splice(this.listaDeAlimentos.indexOf(alimento),1) 
  }
}
