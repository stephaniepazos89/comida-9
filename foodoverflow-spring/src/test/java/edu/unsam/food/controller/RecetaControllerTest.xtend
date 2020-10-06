package edu.unsam.food.controller

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import java.util.List
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertTrue
import edu.unsam.food.repos.RepoRecetas
import edu.unsam.food.domain.Receta
import edu.unsam.food.domain.UsuarioAutor
import edu.unsam.food.domain.UsuarioPorDefecto
import edu.unsam.food.domain.RecetaSimple
import edu.unsam.food.domain.RecetaCompuesta

@AutoConfigureJsonTesters
@ContextConfiguration(classes=RecetaController)
@WebMvcTest
@DisplayName("Testeo de un RecetaController")
class RecetaControllerTest {
	
	@Autowired
	MockMvc mockMvc
	RepoRecetas repoRecetas = RepoRecetas.instance
	Receta receta
	UsuarioAutor usuario
	
	@BeforeEach
	def void init() {
		repoRecetas.lista.clear
		usuario = new UsuarioAutor(new UsuarioPorDefecto("Demian","demi14", 1.80, 80))
		repoRecetas.create(new RecetaSimple("Milanesa", usuario))
		repoRecetas.create(new RecetaCompuesta("Milanesa con Papas Fritas y Huevo Frito", new UsuarioAutor(new UsuarioPorDefecto("Lucas Gimenez", "Gimi14", 80, 1.74))))
		receta = repoRecetas.create(new RecetaSimple("Guiso", usuario))
	}
	
	@DisplayName("Al buscar con el campo busqueda vacio, obtenemos todas las recetas.")
	@Test
	def void testEmptyBodyGetAllRecetas() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/busqueda")).andReturn.response
		val recetas = responseEntity.contentAsString.fromJsonToList(Receta)
		assertEquals(200, responseEntity.status)
		assertEquals(recetas.size, 3)
	}
	
	@DisplayName("Al buscar con el campo de busqueda con una palabra obtenemos receta con ese nombre")
	@Test
	def void testBuscaRecetaPorNombreReceta() {
		val nombreReceta = "mil"
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/busqueda").content(mapper.writeValueAsString(nombreReceta))).andReturn.
			response
		val recetas = responseEntity.contentAsString.fromJsonToList(Receta)
		assertEquals(200, responseEntity.status)
		assertTrue(recetas.exists[receta | receta.nombreDePlato.toLowerCase.contains(nombreReceta)])
		assertEquals(recetas.size,2)
	}
	
	@DisplayName("Al buscar con el campo de busqueda con una palabra obtenemos receta con ese Autor")
	@Test
	def void testBuscaRecetaPorNombreAutor() {
		val nombreAutor = "dem"
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/busqueda").content(mapper.writeValueAsString(nombreAutor))).andReturn.
			response
		val recetas = responseEntity.contentAsString.fromJsonToList(Receta)
		assertEquals(200, responseEntity.status)
		assertTrue(recetas.exists[receta | receta.autor.nombreYApellido.toLowerCase.contains(nombreAutor)])
	}
	
	@DisplayName("Se busca con campo de busqueda una palabra y no obtenemos resultados")
	@Test
	def void testBuscarTareasPorDescripcionNoMatch() {
		val nombreReceta = "Pizza"
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/busqueda").content(mapper.writeValueAsString(nombreReceta))).andReturn.
			response
		val recetas = responseEntity.contentAsString.fromJsonToList(Receta)
		assertEquals(200, responseEntity.status)
		assertTrue(recetas.isEmpty)
	}
	
	
	@DisplayName("Se busca receta por el ID y obtengo la receta")
	@Test
	def void testBuscaRecetaPorId() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/receta/" + 1)).andReturn.response
		val recetaBuscada = responseEntity.contentAsString.fromJson(Receta)
		assertEquals(200, responseEntity.status)
		assertEquals(recetaBuscada.nombreDePlato, "Milanesa")
	}
	

	@DisplayName("Se busca receta por id CERO (Nulo) y obtengo error 400")
	@Test
	def void testBuscaTareaPorIdInvalido() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/receta/0")).andReturn.response
		assertEquals(400, responseEntity.status)
		assertEquals("Debe ingresar el id de Receta", responseEntity.contentAsString)
	}
	
	@DisplayName("Se busca receta por ID que no existe y obtengo error 404")
	@Test
	def void testBuscaTareaPorIdInexistente() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/receta/100")).andReturn.response
		assertEquals(404, responseEntity.status)
		assertEquals("No se encontro receta con ID <100>", responseEntity.contentAsString)
	}
	
	@DisplayName("Se actualiza una receta con values validos")
	@Test
	def void testActualizarRecetaValida() {
		val recetaBody = getReceta() =>[ id = receta.id ]

		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/receta/" + receta.id).content(mapper.writeValueAsString(recetaBody))).andReturn.
			response
		assertEquals(200, responseEntityPut.status)
		
		val responseEntityGet = mockMvc.perform(MockMvcRequestBuilders.get("/receta/" + receta.id)).andReturn.response
		val recetaActualizada = responseEntityGet.contentAsString.fromJson(Receta)
		assertEquals(200, responseEntityGet.status)
		assertEquals(recetaActualizada.nombreDePlato, recetaBody.nombreDePlato)
	}
	
	@DisplayName("Se intenta actualizar receta pero no coincide ID de la url y el body y produce error 400")
	@Test
	def void testActualizaRecetaDistintosIds() {
		val tareaBody = getReceta => [id = receta.id]
		
		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/receta/" + (receta.id + 100)).content(mapper.writeValueAsString(tareaBody))).
			andReturn.response
		assertEquals(400, responseEntityPut.status)
		assertEquals("ID de URL distinto que ID de Body", responseEntityPut.contentAsString)
	}
	
	
	def getReceta(){
		new RecetaSimple => [
						autor = usuario
						nombreDePlato= "Lentejas"
		]
	}
	
	static def <T extends Object> fromJson(String json, Class<T> expectedType) {
		mapper.readValue(json, expectedType)
	}
	
	static def <T extends Object> List<T> fromJsonToList(String json, Class<T> expectedType) {
		val type = mapper.getTypeFactory().constructCollectionType(List, expectedType)
		mapper.readValue(json, type)
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}