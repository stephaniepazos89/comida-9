import { Usuario } from './usuario'
import { Ingrediente } from './ingrediente'
import { CondicionAlimenticia } from './condicionAlimenticia'
import { Dificultad } from './dificultad'
export class Receta {

     public listaDeColaboradores: Usuario[] = []
     public listaDeIngredientes: Ingrediente[] = []
     public listaDePasos: String[] = []
     public dificultad: Dificultad
     public img: string
     public usuarioAutor?: String

    constructor(public id?: number, public autor?: Usuario, public nombreDelPlato?: string, public calorias? :number){   }

    static fromJson(recetaJSON): Receta {
        return Object.assign(new Receta(), recetaJSON, {})
    }

    copy(): Receta {
        const clone = Object.assign(new Receta(), JSON.parse(JSON.stringify(this)))
        clone.doCopy(this)
        return clone
    }

    public esAutor(usuario: Usuario): boolean{
        return this.autor == usuario
    }

    public esColaborador(usuario:Usuario): boolean{
        return this.listaDeColaboradores.includes(usuario)
    }

    public esEditablePor(usuario:Usuario): boolean{
        return this.esAutor(usuario) || this.esColaborador(usuario)
    }

    public agregarColaborador(_colaborador: Usuario): void{
       this.listaDeColaboradores.push(_colaborador)
    }

    public agregarIngrediente(ingrediente: Ingrediente): void{
        this.listaDeIngredientes.push(ingrediente)
     }

     public agregarPaso(paso: string): void{
        this.listaDePasos.push(paso)
     }

    public inadecuadoPara(): CondicionAlimenticia[]{
        let listaCondicion = this.listaDeIngredientes.map(ingrediente => ingrediente.inadecuadoPara())
        let reduce = [].concat.apply([], listaCondicion)
        return reduce   
    }

    toJSON(): Receta {
        return {
            type: "recetaSimple",
            ...this
        }
    }

}

export class RecetaBusquedaAutor{

    constructor(public palabraBuscada: string, public nombreAutor: string){ }
}