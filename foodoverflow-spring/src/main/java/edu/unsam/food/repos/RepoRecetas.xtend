package edu.unsam.food.repos

import edu.unsam.food.domain.Receta
import edu.unsam.food.domain.RecetaCompuesta
import edu.unsam.food.domain.RecetaSimple
import edu.unsam.food.domain.UsuarioAutor
import edu.unsam.food.domain.UsuarioPorDefecto

class RepoRecetas {
	
	static RepoRecetas instance
	
	static def getInstance() {
		
		if (instance === null) {
			instance = new RepoRecetas
		}
		
		instance
	}
	
	
	Repositorio<Receta> repoRecetas = new Repositorio =>[
		create(new RecetaSimple("Milanesa", new UsuarioAutor(new UsuarioPorDefecto("Eduardo Biloni", "Biloba", 60, 1.70))))
		create(new RecetaCompuesta("Milanesa con Papas Fritas y Huevo Frito", new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74))))
		create(new RecetaSimple("Papas Fritas", new UsuarioAutor(new UsuarioPorDefecto("Mauro Silva", "Mauro96", 90, 1.60))))
	]
}
