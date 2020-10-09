package edu.unsam.food.controller

import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters
import org.springframework.test.context.ContextConfiguration
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.junit.jupiter.api.DisplayName
import edu.unsam.food.controller.UsuarioController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import edu.unsam.food.repos.RepoUsuario
import org.junit.jupiter.api.BeforeEach
import java.time.LocalDate
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature
import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertTrue
import org.springframework.test.annotation.DirtiesContext
import edu.unsam.food.domain.UsuarioPorDefecto
import edu.unsam.food.domain.Alimento
import edu.unsam.food.domain.GrupoAlimenticio
import edu.unsam.food.domain.Diabetico
import edu.unsam.food.domain.Celiaco
import edu.unsam.food.domain.Mensaje

@AutoConfigureJsonTesters
@ContextConfiguration(classes=UsuarioController)
@WebMvcTest
@DirtiesContext
@DisplayName("Dado un controller de usuarios")
class UsuarioControllerTest {
	
	@Autowired
	MockMvc mockMvc
	RepoUsuario repoUsuario = RepoUsuario.instance
	UsuarioPorDefecto usuarioLogueado
	UsuarioPorDefecto usuarioDestino
	UsuarioPorDefecto usuarioBody	
	
	@BeforeEach
	def void init() {
		//repoUsuario.lista.clear
		usuarioLogueado = new UsuarioPorDefecto(
			"Pedro Alvarez", "peal14", 80, 1.80
			) => [
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				fechaDeNacimiento = LocalDate.now()
				agregarCondicionAlimenticia(new Diabetico())
				agregarCondicionAlimenticia(new Celiaco())
				ingresarMensaje(new Mensaje => [
					cuerpoDeMensaje = "Hola como estas"
					destinatario = "Pedro Alvarez"
				])
			]
				
		usuarioDestino = new UsuarioPorDefecto("Manuel Gerry", "manuguer", 60, 1.50)
		
		repoUsuario => [
			create(usuarioDestino)
			create(usuarioLogueado)
		]
	}
	
	
	
	@DisplayName("Se obtiene el usuario logueado")
	@Test
	def void testGetUsuarioLogueado() {
		
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/perfil").content("2")
		).andReturn.response
		
		val usuario = responseEntity.contentAsString.fromJson(UsuarioPorDefecto)
		
		assertEquals(200, responseEntity.status)
		assertEquals("Pedro Alvarez",usuario.nombreYApellido)
	}
	
	@DisplayName("Se recibe un id de usuario incorrecto y se devuelve mensaje de error")
	@Test
	def void testGetIdUsuarioIncorrecto() {
		
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/perfil").content("10")
		).andReturn.response
		
		assertEquals(400, responseEntity.status)
		assertEquals("Solicitud Incorrecta", responseEntity.contentAsString)
	}
	
	@DisplayName("Se actualiza un usuario y el estado es válido")
	@Test
	def void testPutUsuarioActualizado() {
		
		usuarioBody = new UsuarioPorDefecto(
			"Pedro Alberto Alvarez", "pedrito22", 90, 1.80
			) => [
				id = usuarioLogueado.id
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				fechaDeNacimiento = LocalDate.now()
				agregarCondicionAlimenticia(new Diabetico())
				agregarCondicionAlimenticia(new Celiaco())
				ingresarMensaje(new Mensaje => [
					cuerpoDeMensaje = "Hola como estas"
					emisor = RepoUsuario.instance.getById(1).nombreYApellido
					destinatario = "Pedro Alberto Alvarez"
				])
			]
		
		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/perfil").content(mapper.writeValueAsString(usuarioBody))
		).andReturn.response
		
		val responseEntityGet = mockMvc.perform(
			MockMvcRequestBuilders.get("/perfil").content("2")
		).andReturn.response
		
		val usuarioActualizado = responseEntityGet.contentAsString.fromJson(UsuarioPorDefecto)
		
		assertEquals(200, responseEntityPut.status)
		
		assertEquals(200, responseEntityGet.status)
		
		assertEquals(usuarioActualizado.nombreYApellido, usuarioBody.nombreYApellido)
		
	}
	
	@DisplayName("Se intenta actualizar un usuario con id incorrecto y tirra mensaje de error")
	@Test
	def void testPutUsuarioActualizadoConIdIncorrecto() {
		
		usuarioBody = new UsuarioPorDefecto(
			"Pedro Alberto Alvarez", "pedrito22", 90, 1.80
			) => [
				id = 7
				agregarAlimentoPreferido(new Alimento("Peceto", GrupoAlimenticio.CARNES_PESCADO_HUEVO))
				fechaDeNacimiento = LocalDate.now()
				agregarCondicionAlimenticia(new Diabetico())
				agregarCondicionAlimenticia(new Celiaco())
				ingresarMensaje(new Mensaje => [
					cuerpoDeMensaje = "Hola como estas"
					emisor = RepoUsuario.instance.getById(1).nombreYApellido
					destinatario = "Pedro Alberto Alvarez"
				])
			]
		
		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/perfil").content(mapper.writeValueAsString(usuarioBody))
		).andReturn.response
		
		assertEquals(400, responseEntityPut.status)
		assertEquals("Solicitud Incorrecta", responseEntityPut.contentAsString)

	}
	
	
	
	static def <T extends Object> fromJson(String json, Class<T> expectedType) {
		mapper.readValue(json, expectedType)
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}