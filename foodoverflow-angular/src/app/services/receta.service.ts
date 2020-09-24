import { Injectable } from '@angular/core';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private recetas: Receta[]
  asignadorID: number = 1

  constructor() { 
    this.recetas = [

      this.crearReceta(new Usuario ("German", 65, 1.85), "Milanesa de pollo"),
      this.crearReceta(new Usuario("German", 65, 1.85), "Guiso de lentejas"),
      this.crearReceta(new Usuario("Tomas", 78, 1.62), "Tarta de espinaca"),
      this.crearReceta(new Usuario("Rodrigo", 100, 1.75), "Hamburguesa"),
    ]
  }
  
  public getRecetas(){
    return this.recetas
  }

  agregarReceta(receta: Receta){
    this.recetas.push(receta)
  }

  crearReceta(autor:Usuario, nombreDelPlato: string){
    const receta = new Receta(this.asignadorID, autor, nombreDelPlato)
    this.asignadorID++
    return receta
  }

  getRecetaByID(id:number){
    return this.recetas.find((receta) => {
      return receta.id == id
    })
  }

  busquedaCompleta(recetaBuscada): Receta[]{
  return this.getRecetas().filter(receta => !recetaBuscada || this.coincidencia(receta.nombreDelPlato, recetaBuscada) || this.coincidencia(receta.autor.nombre, recetaBuscada) )
  }

  busquedaPorUsuario(recetaBuscada): Receta[]{
    return  this.getRecetas().filter(receta => !recetaBuscada || this.coincidencia(receta.autor.nombre, recetaBuscada) )
   }
 
   coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }


}
