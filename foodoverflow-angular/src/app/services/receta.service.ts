import { Injectable } from '@angular/core';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private recetas: Receta[]

  constructor() { 
    this.recetas = [
      new Receta(new Usuario ("German", 65, 1.85), "Milanesa de pollo"),
      new Receta(new Usuario("Miguel", 80, 1.70), "Guiso de lentejas"),
      new Receta(new Usuario("Tomas", 78, 1.62), "Tarta de espinaca"),
      new Receta(new Usuario("Rodrigo", 100, 1.75), "Hamburguesa"),
    ];
  }
  
  public getRecetas(){
    return this.recetas
  }

  agregarReceta(receta: Receta){
    this.recetas.push(receta)
  }

  crearReceta(autor:Usuario, nombreDelPlato: string){
    const receta = new Receta(autor, nombreDelPlato)
    return receta
  }

  getTareaByName(nombre:string){
    return this.recetas.find((receta) => {
      return receta.nombreDelPlato == nombre
    })
  }


}
