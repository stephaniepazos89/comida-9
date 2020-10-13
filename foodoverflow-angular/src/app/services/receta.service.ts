import { Injectable } from '@angular/core';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { UsuarioService } from './usuario.service';
import { REST_SERVER_URL } from './configuracion'
import { HttpClient } from '@angular/common/http';

export interface InterfaceRecetaService {
  getRecetas(): Promise<Receta[]>
  getRecetaByID(id: number): Promise<Receta>
  modificarReceta(receta: Receta): Promise<void>
}

@Injectable({
  providedIn: 'root'
})
export class RecetaService implements InterfaceRecetaService{
  public enEdicion: boolean
  public recetaEditada
  public vistaEdicion: boolean

  constructor(private usuarioService:UsuarioService, private http: HttpClient) { }

  
  async getRecetas(){
    const recetas = await this.http.get<Receta[]>(REST_SERVER_URL + '/busqueda').toPromise()
    return recetas.map((receta) => Receta.fromJson(receta))
  }

  async getRecetaByID(id:number){
    const receta = await this.http.get<Receta>(REST_SERVER_URL + '/receta/' + id).toPromise()
    return Receta.fromJson(receta)
    }

  crearRecetaVacia(){
    const receta = new Receta(-1, this.usuarioLogueado())
    this.recetaEditada = receta
    this.recetaEditada.nombreDelPlato=""
    this.recetaEditada.img ="pollo.jpg"
  }
  

  usuarioLogueado(): Usuario{
   return this.usuarioService.usuarioLogin
  }

  async busquedaCompleta(recetaBuscada) {
    return await this.getRecetas()
  }

  async busquedaPorPalabra(palabraBuscada){
    const recetas = await this.http.post<Receta[]>(REST_SERVER_URL + '/busqueda', JSON.stringify(palabraBuscada)).toPromise()
    return recetas.map((receta) => Receta.fromJson(receta))
   }
 
  async busquedaRecetaDeUnAutor(busqueda) {
    const recetas = await this.http.post<Receta[]>(REST_SERVER_URL + '/busquedausuariologin', JSON.stringify(busqueda)).toPromise()
    return recetas.map((receta) => Receta.fromJson(receta))
  }

  coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }

  async agregarReceta(receta: Receta){
    console.log(receta.toJSON())
    await this.http.put(REST_SERVER_URL + '/recetanueva', receta.toJSON()).toPromise()
  }

  async modificarReceta(receta: Receta) {
    console.log(receta)
    await this.http.put(REST_SERVER_URL + '/receta/' + receta.id, receta.toJSON()).toPromise()
  }

  async eliminarReceta(receta: Receta){
    await this.http.delete(REST_SERVER_URL + '/receta/' + receta.id).toPromise()
  }

}
