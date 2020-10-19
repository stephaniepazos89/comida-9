import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Alimento } from 'src/domain/alimento'

@Component({
  selector: 'app-alimentosperfil',
  templateUrl: './alimentosperfil.component.html',
  styleUrls: ['./alimentosperfil.component.css']
})
export class AlimentosperfilComponent implements OnInit {
 
  @Input() titulo: string
  @Input() listaDeAlimentos: Alimento[]
  @Input() esListaDePreferidos: boolean

  constructor(public router: Router, public usuarioService: UsuarioService) {

  }

  ngOnInit() {
    if(this.esListaDePreferidos){
      this.listaDeAlimentos = this.usuarioService.usuarioLogin.alimentosPreferidos
    }else{
      this.listaDeAlimentos = this.usuarioService.usuarioLogin.alimentosDisgustados
    }
    
  }

  goToAlimento(){
    this.usuarioService.esListaDePreferidos = this.esListaDePreferidos
    this.router.navigate(['/alimento'])
  }

  eliminarAlimento(alimento: Alimento){
    this.listaDeAlimentos.splice(this.listaDeAlimentos.indexOf(alimento),1) 
  }
}
