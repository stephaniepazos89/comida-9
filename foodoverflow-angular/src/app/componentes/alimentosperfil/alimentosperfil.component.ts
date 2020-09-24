import { Component, Input, OnInit } from '@angular/core'
import { Alimento } from 'src/domain/alimento'

@Component({
  selector: 'app-alimentosperfil',
  templateUrl: './alimentosperfil.component.html',
  styleUrls: ['./alimentosperfil.component.scss']
})
export class AlimentosperfilComponent implements OnInit {
 
  @Input() titulo: string
  @Input() listaDeAlimentos: Alimento[]

  constructor() {
  }

  ngOnInit() {
  }
}
