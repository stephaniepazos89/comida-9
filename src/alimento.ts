import { CondicionAlimenticia } from './condicionAlimenticia'
import { GrupoAlimenticio } from './grupoAlimenticio'

export class Alimento {

   private listaInadecuado: CondicionAlimenticia[] = []

    constructor(public nombreDeAlimento: string, public grupoAlimenticio: GrupoAlimenticio){}

    inadecuadoPara = (): CondicionAlimenticia[] => this.listaInadecuado

    agregarInadecuado = (condicion: CondicionAlimenticia) => this.listaInadecuado.push(condicion)

}