import { Injectable } from '@angular/core';
import { Celiaco, CondicionAlimenticia, Diabetico, Hipertenso, Vegano, Vegetariano } from 'src/domain/condicionAlimenticia';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configuracion'
@Injectable({
  providedIn: 'root'
})
export class CondicionService {

  private condicionesAlimenticias: CondicionAlimenticia[] = []

  constructor(private http: HttpClient) { 
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

  crearCondicionesdeUsuario(usuarioJSON, usuarioLogueado){

     usuarioJSON.condicionesAlimenticias.forEach(
      condicion => usuarioLogueado.agregarCondicion(this.condicionesAlimenticias
      .find(condicionAlimenticia => condicionAlimenticia.nombre == condicion.nombre).crearCondicion())
      )
    
  }

  // async enviarCondicion(condicion: CondicionAlimenticia){
  //   await this.http.put(REST_SERVER_URL + '/perfilcondicion', condicion.toJSON()).toPromise()
  // }
}
