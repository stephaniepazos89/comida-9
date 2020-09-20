import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from 'src/domain/receta'

@Pipe({
  name: 'recetaFilter'
})
export class RecetaPipe implements PipeTransform {

  transform(recetas: Receta[], recetaBuscada:string): Receta[] {
    return recetas.filter(receta => !recetaBuscada || this.coincidencia(receta.nombreDelPlato, recetaBuscada) || this.coincidencia(receta.autor.nombre, recetaBuscada) )
  }

  coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }

}
