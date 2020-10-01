import { Injectable } from '@angular/core';
import { Celiaco, CondicionAlimenticia, Diabetico, Hipertenso, Vegano, Vegetariano } from 'src/domain/condicionAlimenticia';

@Injectable({
  providedIn: 'root'
})
export class CondicionService {

  private condicionesAlimenticias: CondicionAlimenticia[] = []

  constructor() { 
    this.condicionesAlimenticias = [
      new Diabetico(),
      new Celiaco(),
      new Vegano(),
      new Vegetariano(),
      new Hipertenso()
   ]
  }

  getCondiciones(): CondicionAlimenticia[] {
    return this.condicionesAlimenticias
  }

  getCondicion(posicion: number): CondicionAlimenticia{
    return this.condicionesAlimenticias[posicion]
  }
}
