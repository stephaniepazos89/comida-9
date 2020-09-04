import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'

export class Alimento {

   private listaInadecuado: CondicionAlimenticia[] = []

    constructor(public nombreDeAlimento: string, public grupoAlimenticio: GrupoAlimenticio){}

    public inadecuadoPara(): CondicionAlimenticia[]{
        return this.listaInadecuado
    }

    public agregarInadecuado(condicion: CondicionAlimenticia){
        this.listaInadecuado.push(condicion)
     }

}