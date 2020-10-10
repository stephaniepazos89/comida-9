import { Injectable } from '@angular/core';
import { Receta } from 'src/domain/receta';
import { Usuario } from 'src/domain/usuario';
import { Ingrediente } from 'src/domain/ingrediente';
import { Alimento } from 'src/domain/alimento';
import { GrupoAlimenticio } from 'src/domain/grupoAlimenticio';
import { Vegano, Vegetariano } from 'src/domain/condicionAlimenticia';
import { Dificultad } from 'src/domain/dificultad';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class StubRecetaService {

  public enEdicion: boolean
  public recetaEditada
  private recetas: Receta[]
  asignadorID: number = 0

  constructor(private usuarioService:UsuarioService) { 
    this.recetas = [

      this.crearReceta(new Usuario (1,"German", 65, 1.85), "Milanesa de pollo"),
      this.crearReceta(new Usuario(2,"German", 65, 1.85), "Guiso de lentejas"),
      this.crearReceta(new Usuario(3,"Tomas", 78, 1.62), "Tarta de espinaca"),
      this.crearReceta(new Usuario(4,"Rodrigo", 100, 1.75), "Hamburguesa"),
    ]
  }
  
  public getRecetas(){
    return this.recetas
  }

  agregarReceta(receta: Receta){
    this.recetas.push(receta)
  }

  crearReceta(autor:Usuario, nombreDelPlato: string){
    const receta = new Receta(this.asignadorID, autor, nombreDelPlato, 4000)
    this.asignadorID++

    // PROVISORIO PARA PROBAR.
    let papa: Alimento = new Alimento("Papa", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS, [new Vegano()])
    let carne: Alimento = new Alimento("Carne", GrupoAlimenticio.CARNES_PESCADO_HUEVO, [new Vegetariano()])
    receta.listaDeColaboradores.push(new Usuario (4,"Jorgito", 180, 1.80))
    receta.listaDeColaboradores.push(new Usuario (4,"Jorgito", 180, 1.80))
    receta.listaDeIngredientes.push(new Ingrediente( carne, "500"))
    receta.listaDeIngredientes.push(new Ingrediente( papa , "500"))
    receta.agregarPaso("Cortar la papa")
    receta.dificultad = Dificultad.Dificil
    receta.img = "guiso.jpg"
    return receta
  }

  crearRecetaVacia(){
    const receta = new Receta(-1, this.usuarioLogueado())
    this.recetaEditada = receta
    this.recetaEditada.nombreDelPlato="Nueva Receta"
  }

  getRecetaByID(id:number){
    return this.recetas.find((receta) => {
      return receta.id == id
    })
  }

  usuarioLogueado(): Usuario{
   return this.usuarioService.usuarioLogueado()
  }

  busquedaCompleta(recetaBuscada): Receta[]{
  return this.getRecetas().filter(receta => !recetaBuscada || this.coincidencia(receta.nombreDelPlato, recetaBuscada) || this.coincidencia(receta.autor.nombreYApellido, recetaBuscada) )
  }

  busquedaPorUsuario(usuarioBuscado): Receta[]{
    return  this.getRecetas().filter(receta => !usuarioBuscado || this.coincidencia(receta.autor.nombreYApellido, usuarioBuscado) )
   }
 
  busquedaRecetaDeUnAutor(recetaBuscada, autor): Receta[]{
    return  this.getRecetas().filter(receta => this.coincidencia(receta.nombreDelPlato, recetaBuscada) && receta.autor.nombreYApellido == autor.nombre)
  }

  coincidencia(valor1: string, valor2: string) {
    return valor1.toLowerCase().match(valor2.toLowerCase())
  }

  modificarReceta(receta: Receta) {
    this.recetas.splice(receta.id, 1, receta)
  }

  eliminarReceta(receta: Receta){
    this.recetas.splice(this.recetas.indexOf(receta), 1)
  }


}
