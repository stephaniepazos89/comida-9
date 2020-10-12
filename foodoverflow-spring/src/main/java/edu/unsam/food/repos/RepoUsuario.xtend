package edu.unsam.food.repos

import edu.unsam.food.domain.Usuario
import edu.unsam.food.domain.LoginUsuario

class RepoUsuario extends Repositorio<Usuario> {
	
	static RepoUsuario instance
	
	static def RepoUsuario getInstance() {
		
		if (instance === null) {
			instance = new RepoUsuario
		}
		
		instance
	}
	
	def Usuario loginUser(LoginUsuario busqueda){
		lista.findFirst[usuario | usuario.loginCorrecto(busqueda)]
	}
}