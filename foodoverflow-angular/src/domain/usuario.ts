import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { Alimento } from './alimento'


export class Usuario {
    
    public condicionesAlimenticias: CondicionAlimenticia[] = []
    public rutina: Rutina
    public alimentosPreferidos: Alimento[] = []
    public alimentosDisgustados: Alimento[] = []
    public fechaDeNacimiento = new Date

    constructor(public id?: number, public nombreYApellido?: string, public peso?: number, public estatura?: number){}

    public agregarCondicion(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.push(condicion)
    }

    public quitarCondicion(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.splice(this.condicionesAlimenticias.indexOf(condicion), 1)
    }

    public agregarAlimentoPreferido(alimento:Alimento): void{
        this.alimentosPreferidos.push(alimento)
    }

    public agregarAlimentoDisgustado(alimento:Alimento): void{
        this.alimentosDisgustados.push(alimento)
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
        return this.condicionesAlimenticias.every(condicion => condicion.esSaludable(this))
    }

    public esSaludable(): boolean {
        return this.imcSaludable() || this.condicionAlimenticiaSaludable()
    }

    static fromJson(usuarioJSON): Usuario {
        return Object.assign(new Usuario(), usuarioJSON)
    }

    toJSON(): Usuario {
        return {
            
            ...this
        }
    }
}

export class LoginUsuario{

    constructor(public username: string, public password: string){ }
}