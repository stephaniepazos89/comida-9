package edu.unsam.food.repos

import edu.unsam.food.domain.UsuarioPorDefecto

class RepoUsuario extends Repositorio<UsuarioPorDefecto> {
	
	static RepoUsuario instance
	
	static def RepoUsuario getInstance() {
		
		if (instance === null) {
			instance = new RepoUsuario
		}
		
		instance
	}
	
}