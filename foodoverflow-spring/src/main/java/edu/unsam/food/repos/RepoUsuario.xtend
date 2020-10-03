package edu.unsam.food.repos

import edu.unsam.food.domain.UsuarioPorDefecto

class RepoUsuario {
	
	static RepoUsuario instance
	
	static def getInstance() {
		
		if (instance === null) {
			instance = new RepoUsuario
		}
		
		instance
	}
	
		Repositorio<UsuarioPorDefecto> repoUsuarios = new Repositorio =>[
		create(new UsuarioPorDefecto("Pedro Alvarez", "peal14", 80, 1.80))
		create(new UsuarioPorDefecto("Manuel Gerry", "manuguer", 60, 1.50))
		create(new UsuarioPorDefecto("Alberto Sabatini","albertito86", 73, 1.76))
		create(new UsuarioPorDefecto("Jorge Fiorela", "jorgito", 110 , 1.81))
	]
}