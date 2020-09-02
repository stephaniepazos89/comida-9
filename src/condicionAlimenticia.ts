import { Usuario } from './usuario'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'

export interface CondicionAlimenticia {

    esSaludable(usuario: Usuario): boolean
}

export class Diabetico {

    esSaludable(usuario: Usuario): boolean{

        return usuario.peso < 70 || usuario.rutina == Rutina.ACTIVO
    }
} 

export class Celiaco {

    esSaludable(usuario: Usuario): boolean{
       
        return true
    }
}

export class Hipertenso {
    
    esSaludable(usuario: Usuario): boolean{

        return usuario.rutina == Rutina.INTENSIVO
    }
}

export class Vegano {

    esSaludable(usuario: Usuario): boolean{

        return usuario.alimentosPreferidos.filter(alimento => alimento.grupoAlimenticio == GrupoAlimenticio.GRUPO1).length >= 2
    }
}

export class Vegetariano {
    
    esSaludable(usuario: Usuario): boolean{

        if (usuario.calculoIMC()<30){

			return true
		}else 
		
		return !usuario.alimentosPreferidos.some(alimento => alimento.grupoAlimenticio == GrupoAlimenticio.GRUPO5)
    }
} 