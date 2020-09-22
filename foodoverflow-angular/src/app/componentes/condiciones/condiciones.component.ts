import { Component, OnInit } from '@angular/core';
import { CondicionService } from 'src/app/services/condicion.service';
import { CondicionAlimenticia } from 'src/domain/condicionAlimenticia';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit {

  condiciones: CondicionAlimenticia[] = []

  constructor(public condicionesService: CondicionService) { }

  ngOnInit() {
    this.condiciones = this.condicionesService.getCondiciones()
  }
}
