package edu.unsam.food.app

import edu.unsam.food.repos.RepoRecetas
import edu.unsam.food.domain.RecetaSimple
import edu.unsam.food.domain.UsuarioAutor
import edu.unsam.food.domain.UsuarioPorDefecto
import edu.unsam.food.repos.RepoUsuario
import edu.unsam.food.repos.RepoAlimentos
import edu.unsam.food.domain.Alimento
import edu.unsam.food.domain.GrupoAlimenticio
import edu.unsam.food.domain.Dificultad
import edu.unsam.food.domain.Ingrediente
import edu.unsam.food.domain.Diabetico

class Bootstrap {
	
		def void run() {
			crearRecetas()
			crearUsuarios()
			crearAlimentos()
			
	}

	def void crearRecetas() {
		val usuario = new UsuarioAutor(new UsuarioPorDefecto("Eduardo Biloni", "Biloba", 60, 1.70))
		RepoRecetas.instance => [
			create(new RecetaSimple("Milanesa", usuario)=>[calorias = 1002 
														   dificultad = Dificultad.Media
														   listaDePasos.add("Cortar el pecetto fino")
														   listaDePasos.add("Romper 2 huevos")
														   listaDeColaboradores.add(new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74)))
			])
			create(new RecetaSimple("Guiso", new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74))))
			create(new RecetaSimple("Papas Fritas", usuario))
		]
	}

	def void crearUsuarios() {
		RepoUsuario.instance => [
			create(new UsuarioPorDefecto(
			"Pedro Alvarez", "peal14", 80, 1.80
			) => [
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				]
			)
			create(new UsuarioPorDefecto("Manuel Gerry", "manuguer", 60, 1.50))
			create(new UsuarioPorDefecto("Alberto Sabatini","albertito86", 73, 1.76))
			create(new UsuarioPorDefecto("Jorge Fiorela", "jorgito", 110 , 1.81))
	]
	}
	
	def void crearAlimentos(){
		RepoAlimentos.instance => [
			create(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
			create(new Alimento("Papa", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
			create(new Alimento("Huevo", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
			create(new Alimento("Aceite de Girasol", GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
		]
	}
}