import { Injectable } from '@angular/core';
import {Alimento} from '../domain/alimento';
import {GrupoAlimenticio} from '../domain/GrupoAlimenticio'

@Injectable({
  providedIn: 'root'
})
export class TablaServicioService {

  public tabla:Alimento[] = []

  constructor() {
    this.tabla=[
      new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS),
      new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Sal',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Pimienta',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Morron',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Papa',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
    ]
   }

   getAlimento():Alimento[] {
     return this.tabla
   }
}
