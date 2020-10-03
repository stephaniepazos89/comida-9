package edu.unsam.food.repos

import edu.unsam.food.domain.Alimento
import edu.unsam.food.domain.GrupoAlimenticio

class RepoAlimentos {
	
	static RepoAlimentos instance
	
	static def getInstance() {
		
		if (instance === null) {
			instance = new RepoAlimentos
		}
		
		instance
	}
	
	
	Repositorio<Alimento> repoAlimentos = new Repositorio =>[
		create(new Alimento("Peceto", GrupoAlimenticio.GRUPO4))
		create(new Alimento("Papa", GrupoAlimenticio.GRUPO1))
		create(new Alimento("Huevo", GrupoAlimenticio.GRUPO1))
		create(new Alimento("Aceite de Girasol", GrupoAlimenticio.GRUPO2))
	]
	
}