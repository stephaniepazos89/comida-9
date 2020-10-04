package edu.unsam.food.repos

import edu.unsam.food.domain.Usuario

class RepoUsuario extends Repositorio<Usuario> {
	
	static RepoUsuario instance
	
	static def RepoUsuario getInstance() {
		
		if (instance === null) {
			instance = new RepoUsuario
		}
		
		instance
	}
	
}