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
import edu.unsam.food.domain.Diabetico
import edu.unsam.food.domain.Vegano
import java.time.LocalDate
import edu.unsam.food.domain.Celiaco
import edu.unsam.food.domain.Mensaje
import edu.unsam.food.domain.Ingrediente
import edu.unsam.food.domain.Vegetariano


class Bootstrap {
	
	
	Ingrediente peceto
	val usuario = new UsuarioAutor(new UsuarioPorDefecto("Eduardo Biloni", "edu", 60, 1.70) => [
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				establecerFecha("2020-12-20")
				agregarCondicionAlimenticia(new Diabetico())
				agregarCondicionAlimenticia(new Celiaco())
				password = "1234"
			])
		def void run() {
			crearAlimentos()
			crearIngredientes()
			crearRecetas()
			crearUsuarios()
			
	}

	def void crearRecetas() {
		
		RepoRecetas.instance => [
			create(new RecetaSimple("Milanesa", usuario)=>[calorias = 1002 
														   dificultad = Dificultad.Media
														  listaDeIngredientes.add(peceto)
														   listaDePasos.add("Cortar el pecetto fino")
														   listaDePasos.add("Romper 2 huevos")
														   listaDeColaboradores.add(new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "lucas", 80, 1.74)))
			])
			create(new RecetaSimple("Guiso", new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74))))
			create(new RecetaSimple("Papas Fritas", usuario)=>[calorias = 1002 
														   dificultad = Dificultad.Media
														  listaDeIngredientes.add(peceto)
														   listaDePasos.add("Pelar la papa")
														   listaDePasos.add("Cortar la papa")
														   listaDeColaboradores.add(new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "lucas", 80, 1.74))=>[
														   	password = "1234"
														   ])
			])
		]
		
	}

	def void crearUsuarios() {
		RepoUsuario.instance => [

			
			create(new UsuarioPorDefecto(
			"Eduardo Biloni", "edu", 80, 1.80 
			) => [
				password = "1234"
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				fechaDeNacimiento = LocalDate.now()
				agregarCondicionAlimenticia(new Diabetico())
				agregarCondicionAlimenticia(new Celiaco())
//				ingresarMensaje(new Mensaje => [
//					cuerpoDeMensaje = "Hola como estas"
//					emisor = "Pedro Alvarez"
//					destinatario = RepoUsuario.instance.getById(1).nombreYApellido
//					])
				]
			)
			create(new UsuarioPorDefecto("Alberto Sabatini","albertito86", 73, 1.76))
			create(new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "lucas", 80, 1.74)=>[
														   	password = "1234"]))
			
	]
	}
	
	def void crearAlimentos(){
		RepoAlimentos.instance => [
			create(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO)) => [ inadecuadoPara.add(new Vegano()) inadecuadoPara.add(new Vegetariano())]
			create(new Alimento("Papa", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
			create(new Alimento("Huevo", GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS))
			create(new Alimento("Aceite de Girasol", GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS))
		]
	}
	def void crearIngredientes(){
		peceto=new Ingrediente(RepoAlimentos.instance.getById(1),'500')
	}
}