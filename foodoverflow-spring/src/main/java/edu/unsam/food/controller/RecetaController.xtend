package edu.unsam.food.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import edu.unsam.food.repos.RepoRecetas
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import edu.unsam.food.error.BusinessException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import edu.unsam.food.domain.Receta
import edu.unsam.food.domain.RecetaCompuesta

@RestController
@CrossOrigin
class RecetaController {

	@GetMapping("/busqueda")
	def buscar(@RequestBody (required=false) String body) {
		try {
			if (body===null){
				val tareas = RepoRecetas.instance.lista
				ResponseEntity.ok(tareas)
			} else {
				
				val busqueda = mapper.readValue(body, String)
				val encontrada = RepoRecetas.instance.search(busqueda)
			ResponseEntity.ok(encontrada)
			}
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	@GetMapping("/receta/{id}")
def recetaByID(@PathVariable Integer id) {
	try {
		if (id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val receta = RepoRecetas.instance.getById(id)
		if (receta === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró receta con el id <«id»>''')
		}
		ResponseEntity.ok(receta)
	} catch (RuntimeException e) {
		ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
	}
} 


	
	@PutMapping("/receta/{id}")
	def actualizar(@RequestBody String body, @PathVariable Integer id) {
		try {
			if (id === null || id === 0) {
				return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
			}
			val actualizada = mapper.readValue(body, Receta)

			if (id != actualizada.id) {
				return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
			}
			RepoRecetas.instance.update(actualizada)
			ResponseEntity.ok(actualizada)
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


