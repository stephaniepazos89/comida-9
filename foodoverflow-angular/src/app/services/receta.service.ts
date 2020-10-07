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
  private recetas: Receta[]
  asignadorID: number = 0

  constructor(private usuarioService:UsuarioService, private http: HttpClient) { }

  
  async getRecetas(){
    const recetas = await this.http.get<Receta[]>(REST_SERVER_URL + '/busqueda').toPromise()
    return recetas.map((receta) => Receta.fromJson(receta))
  }

  async getRecetaByID(id:number){
    const receta = await this.http.get<Receta>(REST_SERVER_URL + '/receta/' + id).toPromise()
    return Receta.fromJson(receta)
    }

  agregarReceta(receta: Receta){
    this.recetas.push(receta)
  }

  crearRecetaVacia(){
    const receta = new Receta(-1, this.usuarioLogueado())
    this.recetaEditada = receta
    this.recetaEditada.nombreDelPlato="Nueva Receta"
  }
  

  usuarioLogueado(): Usuario{
   return this.usuarioService.usuarioLogueado()
  }

  busquedaCompleta(recetaBuscada) {
    return this.getRecetas()
  }

  async busquedaPorPalabra(palabraBuscada){
    const recetas = await this.http.get<Receta[]>(REST_SERVER_URL + '/busqueda/receta', palabraBuscada).toPromise()
    return recetas.map((receta) => Receta.fromJson(receta))
   }
 
  busquedaRecetaDeUnAutor(recetaBuscada, autor) {
   // return this.getRecetas().filter(receta => this.coincidencia(receta.nombreDelPlato, recetaBuscada) && receta.autor.nombre == autor.nombre)
  }

  coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }

  async modificarReceta(receta: Receta) {
    await this.http.put(REST_SERVER_URL + '/receta/' + receta.id, receta.toJSON()).toPromise()
  }

  eliminarReceta(receta: Receta){
    this.recetas.splice(this.recetas.indexOf(receta), 1)
  }

}
