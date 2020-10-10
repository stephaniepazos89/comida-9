import { Usuario } from './usuario'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { type } from 'os'

export interface CondicionAlimenticia {

    nombre: string

    esSaludable(usuario: Usuario): boolean
}

export class Diabetico {

    
    nombre: string = 'Diabetico'

    esSaludable(usuario: Usuario): boolean{

        return usuario.peso < 70 || usuario.rutina == Rutina.ACTIVO
    }
} 

export class Celiaco {

    nombre: string = 'Celiaco'

    esSaludable(usuario: Usuario): boolean{
       
        return true
    }
}

export class Hipertenso {

    nombre: string = 'Hipertenso'
    
    esSaludable(usuario: Usuario): boolean{

        return usuario.rutina == Rutina.INTENSIVO
    }
}

export class Vegano {

    nombre: string = 'Vegano'

    esSaludable(usuario: Usuario): boolean{

        return usuario.alimentosPreferidos.filter(
            alimento => alimento.grupoAlimenticio == GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS
            ).length >= 2
    }
}

export class Vegetariano {

    nombre: string = 'Vegetariano'
    
    esSaludable(usuario: Usuario): boolean{

        return usuario.calculoIMC() < 30 || !usuario.alimentosPreferidos.some(
            alimento => alimento.grupoAlimenticio == GrupoAlimenticio.ACEITES_GRASAS_AZUCARES
            )
    }
} 