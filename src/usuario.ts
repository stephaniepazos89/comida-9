import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { Alimento } from './alimento'

export class Usuario {
    
    public condicionesAlimenticias: CondicionAlimenticia[] = []
    public rutina: Rutina = NaN
    public alimentosPreferidos: Alimento[] = []

    constructor(public nombre: string, public peso: number, public estatura: number){}

    public agregarCondicion(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.push(condicion)
    }

    public calculoIMC(): number {
        return this.peso/Math.pow(this.estatura,2)
    }

    public imcSaludable(): boolean {
        return this.calculoIMC() >= 18 && 
        this.calculoIMC() <= 30 && 
        this.condicionesAlimenticias.length == 0
    }

    public condicionAlimenticiaSaludable(): boolean {
        return this.condicionesAlimenticias.every(alimento => alimento.esSaludable(this))
    }

    public esSaludable(): boolean {
        return this.imcSaludable() || this.condicionAlimenticiaSaludable()
    }
}