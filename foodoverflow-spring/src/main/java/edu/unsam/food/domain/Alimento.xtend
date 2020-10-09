package edu.unsam.food.domain

import java.util.HashSet
import org.eclipse.xtend.lib.annotations.Accessors
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeName
import com.fasterxml.jackson.annotation.JsonIgnore

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes( @JsonSubTypes.Type(value = Alimento, name = "alimento") )
@JsonTypeName("alimento")
@Accessors
class Alimento extends Entidad {
	
	String nombreDeAlimento
	@JsonIgnore String descripcion
	Integer id

	@JsonIgnore GrupoAlimenticio grupoAlimenticio
	
	@JsonIgnore HashSet<CondicionAlimenticia> inadecuadoPara = new HashSet<CondicionAlimenticia>

	new (String _nombreDeAlimento, GrupoAlimenticio _grupoAlimenticio){
		
		nombreDeAlimento = _nombreDeAlimento
		
		grupoAlimenticio = _grupoAlimenticio
			
	}
	
	new(){}
	
	def void agregarInadecuado(CondicionAlimenticia _condicion){
		inadecuadoPara.add(_condicion)
	}
	
	override boolean busqueda(String value){
		coincideNombre(value) || coincideDescripcion(value)
	}
	
	def coincideDescripcion(String value) {
		descripcion.toLowerCase.contains(value.toLowerCase)
	}
	
	def coincideNombre(String value) {
		nombreDeAlimento.toLowerCase.contains(value.toLowerCase)
	}
	
	} 

	
@Accessors	
class Ingrediente{
	 Alimento alimento
	 String cantidad
	 
	 new (Alimento _alimento, String _cantidad){
		
		alimento = _alimento
		
		cantidad = _cantidad
			
	}
	
	
	def inadecuadaPara(){
		return alimento.inadecuadoPara
	}
	
	def getNombre(){
		return alimento.nombreDeAlimento
	}
	
	
}

