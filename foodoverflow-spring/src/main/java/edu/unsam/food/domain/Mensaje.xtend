package edu.unsam.food.domain
import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Mensaje {
	
	String cuerpoDeMensaje
	Usuario destinatario
	Usuario emisor
	LocalDateTime horaDeEmision
	LocalDateTime horaDeLectura
	boolean mensajeLeido = false
	
	new (String _cuerpoDeMensaje, Usuario _destinatario){
	
		cuerpoDeMensaje = _cuerpoDeMensaje
		destinatario = _destinatario
	}
	
	def String verMensaje(){
		
		mensajeLeido = true
		horaDeLectura = LocalDateTime.now()
		return cuerpoDeMensaje
		//return (horaDeEmision + " " + emisor + " " + cuerpoDeMensaje)
	}
}