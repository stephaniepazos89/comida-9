import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'

export class Usuario {
    
    public condicionesAlimenticias: CondicionAlimenticia[] = []
    public rutina: Rutina
    public alimentosPreferidos: Alimento[]:  []

    constructor(public nombre: string, public peso: number, public estatura: number){}

    public agregarCondicion(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.push(condicion)
    }

    public calculoIMC(): number {
        return this.peso/Math.pow(this.estatura,2)
    }

    public imcSaludable(): boolean {
        return this.calculoIMC() >= 18 && this.calculoIMC() <= 30
    }

    public condicionAlimenticiaSaludable(): boolean {
        return this.condicionesAlimenticias.length == 0 || this.condicionesAlimenticias.esSaludable()
    }

    public esSaludable(): boolean {
        return this.imcSaludable() && this.condicionAlimenticiaSaludable()
    }
}