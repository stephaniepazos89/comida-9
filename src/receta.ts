import { Usuario } from './usuario'
import { Ingrediente } from './ingrediente'
import { CondicionAlimenticia } from './condicionAlimenticia'
export class Receta {

     private listaColaboradores: Usuario[] = []
     private listaIngredientes: Ingrediente[] = []

    constructor(private autor: Usuario, private nombreDelPlato: string ){   }

    
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

    public inadecuadoPara(): Set<CondicionAlimenticia>{
        let listaCondicion = this.listaIngredientes.flatMap(ingrediente => ingrediente.inadecuadoPara())
        let setCondicion = new Set(listaCondicion) 
        return setCondicion
    }

}