import { Usuario } from './usuario'
import { Ingrediente } from './ingrediente'
import { CondicionAlimenticia } from './condicionAlimenticia'
import { Dificultad } from './dificultad'
export class Receta {

     public listaColaboradores: Usuario[] = []
     public listaIngredientes: Ingrediente[] = []
     public listaPasos: string[] = []
     public calorias: number
     public dificultad: Dificultad

    constructor(public id: number, public autor: Usuario, public nombreDelPlato: string ){   }

    
    public esAutor(usuario: Usuario): boolean{
        return this.autor == usuario
    }

    public esColaborador(usuario:Usuario): boolean{
        return this.listaColaboradores.includes(usuario)
    }

    public esEditablePor(usuario:Usuario): boolean{
        return this.esAutor(usuario) || this.esColaborador(usuario)
    }

    public agregarColaborador(_colaborador: Usuario): void{
       this.listaColaboradores.push(_colaborador)
    }

    public agregarIngrediente(ingrediente: Ingrediente): void{
        this.listaIngredientes.push(ingrediente)
     }

     public agregarPaso(paso: string): void{
        this.listaPasos.push(paso)
     }

    public inadecuadoPara(): CondicionAlimenticia[]{
        let listaCondicion = this.listaIngredientes.map(ingrediente => ingrediente.inadecuadoPara())
        let reduce = [].concat.apply([], listaCondicion)
        return reduce   
    }

}
