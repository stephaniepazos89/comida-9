import { CondicionAlimenticia } from './condicionAlimenticia'
import { Alimento } from './alimento'

export class Ingrediente {

    constructor(public alimento: Alimento, public cantidad: number ){}

    nombre :string = this.alimento.nombreDeAlimento

    inadecuadoPara = (): CondicionAlimenticia[] => this.alimento.inadecuadoPara()

    agregarInadecuado = (condicion: CondicionAlimenticia) => this.alimento.agregarInadecuado(condicion)

    
}