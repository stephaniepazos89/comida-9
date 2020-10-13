import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'
import { Usuario } from 'src/domain/usuario'

@Component({
  selector: 'app-alimentosperfil',
  templateUrl: './alimentosperfil.component.html',
  styleUrls: ['./alimentosperfil.component.css']
})
export class AlimentosperfilComponent implements OnInit {
 
  @Input() titulo: string
  @Input() listaDeAlimentos: Alimento[]
  @Input() usuario: Usuario
  @Input() tipoAlimento: number
  usuarioPerfil: Usuario
  alimentoRecibido: Alimento

  constructor(public router: Router, public usuarioService: UsuarioService) {

  }

  ngOnInit() {
    if(this.tipoAlimento == 1){
      this.listaDeAlimentos = this.usuarioService.usuarioLogin.alimentosPreferidos
    }else{
      this.listaDeAlimentos = this.usuarioService.usuarioLogin.alimentosDisgustados
    }
    
  }

  goToAlimento(){
    this.usuarioService.tipoAlimento = this.tipoAlimento
    this.usuarioService.enEdicion = true
    this.router.navigate(['/alimento'])
  }

  eliminarAlimento(alimento: Alimento){
    this.listaDeAlimentos.splice(this.listaDeAlimentos.indexOf(alimento),1) 
  }
}
