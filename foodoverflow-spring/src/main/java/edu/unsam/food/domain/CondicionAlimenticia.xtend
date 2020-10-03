package edu.unsam.food.domain

abstract class CondicionAlimenticia{
	
	def boolean esSaludable(UsuarioPorDefecto usuario)
	
	def boolean validarAlimento(){
		false
	}
}

class Diabetico extends CondicionAlimenticia{
	
	override esSaludable(UsuarioPorDefecto usuario){
		return   usuario.peso < 70 || usuario.rutina == Rutina.ACTIVO
	}
	
	override validarAlimento(){
		true
	}
}

class Celiaco extends CondicionAlimenticia{
	
	override esSaludable(UsuarioPorDefecto usuario){
		true
	}
	
}

class Hipertenso extends CondicionAlimenticia{
	
	override esSaludable(UsuarioPorDefecto usuario){
		return usuario.rutina == Rutina.INTENSIVO
	}
	
	override validarAlimento(){
		true
	}
}

class Vegano extends CondicionAlimenticia{
	
	override esSaludable(UsuarioPorDefecto usuario){
		return usuario.alimentosPreferidos.filter[alimento | alimento.grupoAlimenticio == GrupoAlimenticio.GRUPO1].size()== 2
	}
	}

class Vegetariano extends CondicionAlimenticia{
	
	override esSaludable(UsuarioPorDefecto usuario){
		if (usuario.calcularIMC<30){
			return true
		}else 
		
		return !usuario.alimentosPreferidos.exists(alimento | alimento.grupoAlimenticio == GrupoAlimenticio.GRUPO5)
	}
	
}
