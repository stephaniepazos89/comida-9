import { Usuario } from './usuario'
import { Alimento } from './alimento'
import { Ingrediente } from './ingrediente'
import { CondicionAlimenticia } from './condicionAlimenticia'
export class Receta {

     private listaColaboradores: Usuario[] = []
     private listaIngredientes: Ingrediente[] = []

    constructor(private autor: Usuario, private nombreDelPlato: String ){   }

    
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

    public inadecuadoPara(): CondicionAlimenticia[]{
       return this.listaIngredientes.flatMap(ingrediente => ingrediente.inadecuadoPara())

    }

}