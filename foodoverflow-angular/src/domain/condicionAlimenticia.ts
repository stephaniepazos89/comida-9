import { Usuario } from './usuario'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { type } from 'ramda'

export interface CondicionAlimenticia {

    
    nombre: string

    esSaludable(usuario: Usuario): boolean

    crearCondicion()
}

export class Diabetico {

    nombre: string = 'Diabetico'

    esSaludable(usuario: Usuario): boolean{

        return usuario.peso < 70 || usuario.rutina == Rutina.ACTIVO
    }

    crearCondicion(){ return new Diabetico() }
} 

export class Celiaco {

    nombre: string = 'Celiaco'

    esSaludable(usuario: Usuario): boolean{
       
        return true
    }

    crearCondicion(){ return new Celiaco() }
}

export class Hipertenso {

    nombre: string = 'Hipertenso'
    
    esSaludable(usuario: Usuario): boolean{

        return usuario.rutina == Rutina.INTENSIVO
    }
    crearCondicion(){ return new Hipertenso() }
}

export class Vegano {

    nombre: string = 'Vegano'

    esSaludable(usuario: Usuario): boolean{

        return usuario.alimentosPreferidos.filter(
            alimento => alimento.grupoAlimenticio == GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS
            ).length >= 2
    }
    crearCondicion(){ return new Vegano() }
}

export class Vegetariano {

    nombre: string = 'Vegetariano'
    
    esSaludable(usuario: Usuario): boolean{

        return usuario.calculoIMC() < 30 || !usuario.alimentosPreferidos.some(
            alimento => alimento.grupoAlimenticio == GrupoAlimenticio.ACEITES_GRASAS_AZUCARES
            )
    }
    crearCondicion(){ return new Vegetariano() }
} 