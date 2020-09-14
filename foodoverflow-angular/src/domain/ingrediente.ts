import { CondicionAlimenticia } from './condicionAlimenticia'
import { Alimento } from './alimento'

export class Ingrediente {

    constructor(private alimento: Alimento, public cantidad: number ){}

    inadecuadoPara = (): CondicionAlimenticia[] => this.alimento.inadecuadoPara()

    agregarInadecuado = (condicion: CondicionAlimenticia) => this.alimento.agregarInadecuado(condicion)

}