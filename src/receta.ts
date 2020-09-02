import { Usuario } from './usuario'
class Receta {
     colaborador: Usuario 

    constructor(private autor: Usuario){
        this.colaborador = new Usuario()
    }

    

    public esAutor(usuario: Usuario): boolean{

        return this.autor == usuario
    }
}