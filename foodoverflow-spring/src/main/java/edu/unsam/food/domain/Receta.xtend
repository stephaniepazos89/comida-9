package edu.unsam.food.domain

import java.util.ArrayList
import java.util.HashSet
import java.util.List
import java.util.Set
import org.eclipse.xtend.lib.annotations.Accessors
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes( @JsonSubTypes.Type(value = RecetaSimple, name = "recetaSimple"), @JsonSubTypes.Type(value = RecetaCompuesta, name = "recetaCompuesta") )
@Accessors abstract class Receta extends Entidad{

	String nombreDePlato
	String ultimoNombre
	UsuarioAutor autor
	List<Usuario> listaDeColaboradores = new ArrayList<Usuario>
	List<String> listaDePasos = new ArrayList<String>
	List<Accion> listaDeAcciones = new ArrayList<Accion>
	List<CopyObserver> copyObservers= new ArrayList
	Dificultad dificultadPorAutorizar
	Receta recetaOriginal
	Accion ultimaAccion
	String pasoEliminado

	
	def boolean caloriasAceptables(){
		
		(10 <= this.caloriasTotales && this.caloriasTotales <= 5000)
	}
	
	def boolean esValida (){
		
		!listaDePasos.empty && !totalIngredientes.empty && this.caloriasAceptables
	}

	
	def boolean esEditable (Usuario _user) {
		
		 _user == autor  || listaDeColaboradores.contains(_user) 		
	}

	def void ingresarColaborador (Usuario colaborador) {

		
		listaDeColaboradores.add(colaborador)		
	}
	
	def void removerColaborador(UsuarioColaborador nuevoColaborador){
		
		listaDeColaboradores.remove(nuevoColaborador)
	}
	
	def void ingresarPaso (String paso){
			
		listaDePasos.add(paso)		
	}
	
	def void seEliminaPaso(Integer pasoAEliminar, Accion eliminarPaso){
		
		pasoEliminado = listaDePasos.get(pasoAEliminar)
		listaDePasos.remove(listaDePasos.get(pasoAEliminar))
		ultimaAccion = eliminarPaso
	}
	
	def void seRecuperaPaso(Integer pasoAEliminar){
		
		listaDePasos.add(pasoAEliminar, pasoEliminado)
	}
	
	def void ingresarAccion(UsuarioColaborador colaborador,Accion accion){ // Se agrega accion a lista
		
		if(esColaborador(colaborador))
			listaDeAcciones.add(accion)
		else throw new Exception("No es colaborador")
	}
	
	def void realizarTodasLasAcciones(){  // Se ejecutan todas las acciones
		
		listaDeAcciones.forEach[ ejecutarAccion(this) ]
	}
	
	def void realizarAccion(Integer posicion){  // Se ejecuta una accion por individual y se elimina de la lista
		
		listaDeAcciones.get(posicion).ejecutarAccion(this)
		removerAccion(posicion)
	}
	
	def void removerAccion(Integer posicion){
		
		listaDeAcciones.remove(listaDeAcciones.get(posicion))
	}
	
	def void deshacerCambio (){  // se restablece lo modificado en la ultima Accion
		
		if (ultimaAccion !== null){
			ultimaAccion.restablecerCambio(this)
			ultimaAccion = null
			}
		else { throw new Exception("No hay acciones pendientes") }
	}
	
	def Set<Ingrediente>totalIngredientes(){}
	
	def HashSet<CondicionAlimenticia> inadecuadaPara (){}
	
	def Integer caloriasTotales()
	
	def List<String>listaTotalPasos(){}
	
	def ingresarReceta(Receta _receta){}
	
	def Dificultad dificultadCompuesta(){}
	
	
	def Boolean validaPara(Set <Alimento> alimentosDisgustados, Set<CondicionAlimenticia> condicionAlimenticia){
		
		!this.inadecuadaPara.exists(condicion | condicionAlimenticia.contains(condicion)) 
		&& !totalIngredientes.exists(ingrediente | alimentosDisgustados.contains(ingrediente.alimento)) 
		&& !this.totalIngredientes.exists(ingrediente | alimentosDisgustados.contains(ingrediente.alimento))
	}
	
	def Boolean esValidaGrupo(List<Usuario> listaUsuario){
		
		val HashSet<CondicionAlimenticia> condicionesGrupales = new HashSet<CondicionAlimenticia>
		val HashSet<Alimento> alimentosGrupales = new HashSet<Alimento>
		
		condicionesGrupales.addAll(listaUsuario.map [ usuario | usuario.condicionAlimenticia ].flatten)
		alimentosGrupales.addAll(listaUsuario.map [ usuario | usuario.alimentosDisgustados].flatten)		
		
		return validaPara(alimentosGrupales, condicionesGrupales)
	}
	
	override boolean busqueda(String value){
		
		 coindiceNombre(value)  || coincideIngrediente(value) 
	}
	
	def boolean coincideIngrediente(String value){
		
		totalIngredientes.exists[ ingrediente | ingrediente.getNombre.toLowerCase.contains(value.toLowerCase)] 
	|| totalIngredientes.exists[ ingrediente | ingrediente.getNombre.toLowerCase.contains(value.toLowerCase)]
	}
	
	def boolean coindiceNombre(String value){
		
		nombreDePlato.toLowerCase().contains(value.toLowerCase())
	}
	
	def Receta generarCopia(UsuarioAutor _usuario)
	
	def boolean esColaborador(UsuarioColaborador colaborador){
		
		listaDeColaboradores.contains(colaborador)
	}
	
	def void seEditaTitulo(String nuevoTitulo, Accion editarTitulo){  // Carga nuevo titulo para posterior aprobación
		
		ultimoNombre = nombreDePlato
		nombreDePlato = nuevoTitulo
		ultimaAccion = editarTitulo
	}
	
	def void seEditaDificultad(Dificultad nuevaDificultad, Accion editarDificultad){}

	
	def void seRecuperaTitulo(){
		
		nombreDePlato = ultimoNombre
	}
	
	def void seRecuperaDificultad(){}
	
	def void sumarCopiaAutor(){
		autor.sumarCopia
	}
	
}


@JsonTypeName("recetaCompuesta")
class RecetaCompuesta extends Receta {
		
	@Accessors List<Receta> subrecetas = new ArrayList<Receta>
	
	
	new (String _nombreDePlato, UsuarioAutor _autor){    // Constructor de Objetos
		
		nombreDePlato = _nombreDePlato
		
		autor = _autor			
	}
	
	new (UsuarioAutor _autor){
		
		autor = _autor
		
	}
	
	override ingresarReceta(Receta _receta){
		
		subrecetas.add(_receta)
	}
	
	override Integer caloriasTotales (){
		
		subrecetas.fold (0, [acum, receta | acum + receta.caloriasTotales])	
	}
	
	
	override inadecuadaPara (){
		val HashSet<CondicionAlimenticia> localSet = new HashSet<CondicionAlimenticia>
		
		localSet.addAll((subrecetas.map[subreceta | subreceta.inadecuadaPara].flatten))
		
		return localSet
	}
	
	override listaTotalPasos(){
		var List<String> localList = new ArrayList<String>
		localList.addAll(listaDePasos)
		localList.addAll(subrecetas.map[ subreceta | subreceta.listaTotalPasos].flatten.toList)
		return localList
	}

	
	override Set<Ingrediente> totalIngredientes(){
		subrecetas.map[ subreceta | subreceta.totalIngredientes].flatten.toSet
	}
	
	override RecetaCompuesta generarCopia(UsuarioAutor _usuario){
				
				var RecetaCompuesta copiaReceta
	           
	            copiaReceta = new RecetaCompuesta(_usuario) =>[
	            
					nombreDePlato = this.nombreDePlato
					listaDePasos = this.listaDePasos
					recetaOriginal = this        	
					subrecetas = this.subrecetas]
					
	            return copiaReceta
	}
	
	override Dificultad dificultadCompuesta(){                 
		var Set<Dificultad> dificultades = new HashSet<Dificultad>
		dificultades = subrecetas.map[subreceta | subreceta.dificultadCompuesta].toSet
		return dificultades.max()
	}	
}

@JsonTypeName("recetaSimple")
@Accessors
class RecetaSimple extends Receta{
	
	Integer calorias
	Dificultad dificultad
	Dificultad anteriorDificultad
	Set<Ingrediente>listaDeIngredientes  = new HashSet<Ingrediente> 
	
	new (String _nombreDePlato, UsuarioAutor _autor){    
	
		nombreDePlato = _nombreDePlato
		
		autor = _autor		
	}
	
	new (UsuarioAutor _autor){
		
		autor = _autor
		
	}
	
	def void ingresarIngrediente (Ingrediente _ingrediente){
		
		listaDeIngredientes.add(_ingrediente)
		
	}
	
	override Integer caloriasTotales(){ calorias }
	
	override inadecuadaPara (){
		val HashSet<CondicionAlimenticia> localSet = new HashSet<CondicionAlimenticia>
		localSet.addAll(listaDeIngredientes.map [ ingrediente | ingrediente.inadecuadaPara ].flatten)
		return localSet

	}
	
	override listaTotalPasos(){ listaDePasos }
	
	override RecetaSimple generarCopia(UsuarioAutor _usuario){
				
				var RecetaSimple copiaReceta
	           
	            copiaReceta = new RecetaSimple(_usuario)=>[
	            
					nombreDePlato = this.nombreDePlato
					listaDeIngredientes = this.listaDeIngredientes
					listaDePasos = this.listaDePasos
					calorias = this.calorias
					dificultad = this.dificultad 
					recetaOriginal = this    
					]    	

	            return copiaReceta
	}
	
	override totalIngredientes(){ listaDeIngredientes }
	
	override seEditaDificultad(Dificultad nuevaDificultad, Accion editarDificultad){
		
		anteriorDificultad = dificultad
		dificultad = nuevaDificultad
		ultimaAccion = editarDificultad
	}
	
	override Dificultad dificultadCompuesta(){                 
		return dificultad
	}
	
	override seRecuperaDificultad(){
		
		dificultad = anteriorDificultad
	}
}

