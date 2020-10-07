package edu.unsam.food.app

import edu.unsam.food.repos.RepoRecetas
import edu.unsam.food.domain.RecetaSimple
import edu.unsam.food.domain.RecetaCompuesta
import edu.unsam.food.domain.UsuarioAutor
import edu.unsam.food.domain.UsuarioPorDefecto
import edu.unsam.food.repos.RepoUsuario
import edu.unsam.food.repos.RepoAlimentos
import edu.unsam.food.domain.Alimento
import edu.unsam.food.domain.GrupoAlimenticio
import edu.unsam.food.domain.Dificultad

class Bootstrap {
	
		def void run() {
			crearRecetas()
			crearUsuarios()
			crearAlimentos()
			
	}

	def void crearRecetas() {
		val usuario = new UsuarioAutor(new UsuarioPorDefecto("Eduardo Biloni", "Biloba", 60, 1.70))
		RepoRecetas.instance => [
			create(new RecetaSimple("Milanesa", usuario)=>[calorias = 1002 dificultad = Dificultad.Media])
			create(new RecetaCompuesta("Milanesa con Papas Fritas y Huevo Frito", new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74))))
			create(new RecetaSimple("Papas Fritas", new UsuarioAutor(new UsuarioPorDefecto("Mauro Silva", "Mauro96", 90, 1.60))))
		]
	}

	def void crearUsuarios() {
		RepoUsuario.instance => [
			create(new UsuarioPorDefecto(
			"Pedro Alvarez", "peal14", 80, 1.80
			) => [
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.GRUPO4))
				]
			)
			create(new UsuarioPorDefecto("Manuel Gerry", "manuguer", 60, 1.50))
			create(new UsuarioPorDefecto("Alberto Sabatini","albertito86", 73, 1.76))
			create(new UsuarioPorDefecto("Jorge Fiorela", "jorgito", 110 , 1.81))
	]
	}
	
	def void crearAlimentos(){
		RepoAlimentos.instance => [
			create(new Alimento("Peceto", GrupoAlimenticio.GRUPO4))
			create(new Alimento("Papa", GrupoAlimenticio.GRUPO1))
			create(new Alimento("Huevo", GrupoAlimenticio.GRUPO1))
			create(new Alimento("Aceite de Girasol", GrupoAlimenticio.GRUPO2))
		]
	}
}