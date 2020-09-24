import { Injectable } from '@angular/core';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio'
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  public alimentos:Alimento[] = []

  constructor() {
    this.alimentos=[
      new Alimento('Lentejas',GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS),
      new Alimento('Cebolla',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Sal',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Pimienta',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Morron',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
      new Alimento('Papa',GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS),
    ]
   }

   getAlimento():Alimento[] {
     return this.alimentos
   }
}
