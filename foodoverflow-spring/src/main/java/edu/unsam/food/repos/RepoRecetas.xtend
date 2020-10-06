package edu.unsam.food.repos

import edu.unsam.food.domain.Receta

class RepoRecetas extends Repositorio<Receta> {
	
	static RepoRecetas instance
	
	static def RepoRecetas getInstance() {
		
		if (instance === null) {
			instance = new RepoRecetas
		}
		
		instance
	}
	
	private new() {
	}
	
	
}
