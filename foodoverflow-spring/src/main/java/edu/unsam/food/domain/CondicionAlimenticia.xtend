package edu.unsam.food.domain

import org.eclipse.xtend.lib.annotations.Accessors
@Accessors
abstract class CondicionAlimenticia{
	
	def boolean esSaludable(UsuarioPorDefecto usuario)
	
	def boolean validarAlimento(){
		false
	}
}

@Accessors
class Diabetico extends CondicionAlimenticia{
	
	String nombre = "Diabetico"
	
	override esSaludable(UsuarioPorDefecto usuario){
		return   usuario.peso < 70 || usuario.rutina == Rutina.ACTIVO
	}
	
	override validarAlimento(){
		true
	}
}
@Accessors
class Celiaco extends CondicionAlimenticia{
	String nombre = "Celiaco"
	
	override esSaludable(UsuarioPorDefecto usuario){
		true
	}
	
}
@Accessors
class Hipertenso extends CondicionAlimenticia{
	String nombre = "Hipertenso"
	
	override esSaludable(UsuarioPorDefecto usuario){
		return usuario.rutina == Rutina.INTENSIVO
	}
	
	override validarAlimento(){
		true
	}
}
@Accessors
class Vegano extends CondicionAlimenticia{
	String nombre = "Vegano"
	override esSaludable(UsuarioPorDefecto usuario){
		return usuario.alimentosPreferidos.filter[alimento | alimento.grupoAlimenticio == GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS].size()== 2
	}
	}
@Accessors
class Vegetariano extends CondicionAlimenticia{
	String nombre = "Vegetariano"
	override esSaludable(UsuarioPorDefecto usuario){
		if (usuario.calcularIMC<30){
			return true
		}else 
		
		return !usuario.alimentosPreferidos.exists(alimento | alimento.grupoAlimenticio == GrupoAlimenticio.ACEITES_GRASAS_AZUCARES)
	}
	
}
