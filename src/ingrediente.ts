import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { Alimento } from './alimento'

export class Ingrediente {

    constructor(private alimento: Alimento, public cantidad: number ){}

    public inadecuadoPara(): CondicionAlimenticia[]{
        return this.alimento.inadecuadoPara()
    }

    public agregarInadecuado(condicion: CondicionAlimenticia){
        this.alimento.agregarInadecuado(condicion)
     }

}