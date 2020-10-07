package edu.unsam.food.controller

import edu.unsam.food.repos.RepoAlimentos
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.HttpStatus
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import edu.unsam.food.error.BusinessException

@RestController
@CrossOrigin
class AlimentoController{
	
	@GetMapping("/alimento")
	def mostrarAlimento() {
		try {
			val alimento = RepoAlimentos.instance
			ResponseEntity.ok(tareas)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

	@GetMapping("/alimento")
	def cargarAlimento(@RequestBody String id){
		try{
			if(id===null){
				return ResponseEntity.badRequest.body('''Alimento no encontrado''')
			}
			val alimentoId = mapper.readValue(id, Integer)
			
			val alimento = RepoAlimentos.instance.getById(alimentoId)
			ResponseEntity.ok(alimento)
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
	}
	