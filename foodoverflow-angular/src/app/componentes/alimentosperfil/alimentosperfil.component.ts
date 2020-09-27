import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  goToAlimento(){
    this.router.navigate(['/alimento', this.usuario.id])
  }
}
