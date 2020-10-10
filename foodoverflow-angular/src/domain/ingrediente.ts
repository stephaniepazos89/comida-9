import { CondicionAlimenticia } from './condicionAlimenticia'
import { Alimento } from './alimento'

export class Ingrediente {

    static fromJson(recetaJSON): Ingrediente {
        return Object.assign(new Ingrediente(), recetaJSON, {})
    }

    constructor(public alimento?: Alimento, public cantidad?: string ){}

    nombre :string = this.alimento.nombreDeAlimento

    inadecuadoPara = (): CondicionAlimenticia[] => this.alimento.inadecuadoPara()

    agregarInadecuado = (condicion: CondicionAlimenticia) => this.alimento.agregarInadecuado(condicion)

    
}