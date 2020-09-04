import { CondicionAlimenticia, Vegano } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { Usuario } from './usuario'

describe('Tests de Usuario', () => {

    let usuario1: Usuario
    let usuario2: Usuario

    beforeEach(() => {
        usuario1 = new Usuario ('Pedro', 97.2, 1.8)
    })
    
    test('Medicion de IMC', () => {

        expect(30).toBe(usuario1.calculoIMC())
    })

    test('Usuario es saludable por condicion de IMC', () => {

        expect(true).toBe(usuario1.esSaludable())
    })

    test('Usuario no es saludable por ambas condiciones', () => {

        usuario2 = new Usuario("Jorge Zarate", 110, 1.5)
        usuario2.agregarCondicion(new Vegano)

        expect(false).toBe(usuario2.esSaludable())
    })
})