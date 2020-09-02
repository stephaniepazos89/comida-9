import { CondicionAlimenticia } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'

export class Alimento {

    constructor(public nombreDeAlimento: string, public grupoAlimenticio: GrupoAlimenticio){}
}