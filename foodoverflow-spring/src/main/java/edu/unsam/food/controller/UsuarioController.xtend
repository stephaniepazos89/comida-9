package edu.unsam.food.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import edu.unsam.food.repos.RepoUsuario
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import edu.unsam.food.error.BusinessException
import org.springframework.web.bind.annotation.PostMapping
import edu.unsam.food.domain.Usuario
import edu.unsam.food.domain.LoginUsuario
import org.springframework.web.bind.annotation.GetMapping
import edu.unsam.food.domain.CondicionAlimenticia


@RestController
@CrossOrigin
class UsuarioController {
	
	@PostMapping("/perfil")
	def cargarUsuario(@RequestBody String id) {
		try {
			if (id === null) {
				return  ResponseEntity.badRequest.body('''Solicitud Incorrecta''')
			}
			val usuarioId = mapper.readValue(id, Integer)
			
			if (this.cantidadDeUsuariosValida(usuarioId)) {
				return  ResponseEntity.badRequest.body('''Solicitud Incorrecta''')
			} else {
				val usuario = RepoUsuario.instance.getById(usuarioId)
				ResponseEntity.ok(usuario)
			}
			
			
		} catch (BusinessException e) {
		ResponseEntity.badRequest.body(e.message)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
		
	}
	
	@PostMapping("/login")
	def loginUsuario(@RequestBody String body) {
		try {
			val busqueda = mapper.readValue(body, LoginUsuario)
			val encontrada = RepoUsuario.instance.loginUser(busqueda)				
			ResponseEntity.ok(encontrada)

		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	@GetMapping("/usuarios")
	def buscarTodosLosUsuarios() {
		try {
				val usuarios = RepoUsuario.instance.lista
				ResponseEntity.ok(usuarios)
			
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	
	@PutMapping("/perfil")
	def actualizarUsuario(@RequestBody String nuevoUsuario) {
		try {
			if (nuevoUsuario === null) {
				return ResponseEntity.badRequest.body('''No se recibe Usuario''')
			}
			val usuarioActualizado = mapper.readValue(nuevoUsuario, Usuario)
			
			if (this.cantidadDeUsuariosValida(usuarioActualizado.id)) {
				return  ResponseEntity.badRequest.body('''Solicitud Incorrecta''')
			} else {
				RepoUsuario.instance.updateUser(usuarioActualizado)
				ResponseEntity.ok(usuarioActualizado)
			}
			
			
		} catch (BusinessException e) {
			ResponseEntity.badRequest.body(e.message)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	@PutMapping("/perfilcondicion")
	def seRecibeCondicion(@RequestBody String condicion) {
		try {
			if (condicion === null) {
				return ResponseEntity.badRequest.body('''No se recibe condicion''')
			}
			val condicionDeserializada = mapper.readValue(condicion, CondicionAlimenticia)
			
				RepoUsuario.instance.condicionRecibida = condicionDeserializada
				ResponseEntity.ok(condicion)
				
			
		} catch (BusinessException e) {
			ResponseEntity.badRequest.body(e.message)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
		]
	}
	
	def boolean cantidadDeUsuariosValida(Integer id) {
		return id === 0 || RepoUsuario.instance.lista.size < id
	}
}
