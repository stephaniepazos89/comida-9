package edu.unsam.food.repos

import org.eclipse.xtend.lib.annotations.Accessors
import java.util.Set
import java.util.HashSet
import java.util.List
import edu.unsam.food.domain.Entidad
import edu.unsam.food.domain.ExceptionID
import edu.unsam.food.domain.UsuarioPorDefecto
import edu.unsam.food.domain.Alimento
import edu.unsam.food.domain.GrupoAlimenticio
import edu.unsam.food.domain.UsuarioAutor
import edu.unsam.food.domain.RecetaSimple
import edu.unsam.food.domain.RecetaCompuesta
import edu.unsam.food.domain.Receta

@Accessors
class Repositorio<T extends Entidad> {
	
	 Set<T> lista = new HashSet()
	 Integer idRepo = 0
	
	new (){
		
	}
	
	def create(T object) {
		lista.add(object)
		object.id = idRepo
		idRepo++
	}

	def delete(T object) {
		lista.remove(object)
	}

	def update(T object) {
		try {
			lista.remove(getById(object.id))
		} catch (Exception error) {
			throw new ExceptionID("ID inexistente.")
		}
		lista.add(object)
	}

	def T getById(int id) {
		lista.filter[objetos|objetos.id == id].get(0)
	}

	def List<T> search(String value) {	
		return lista.filter[busqueda(value)].toList
	}
	
}





