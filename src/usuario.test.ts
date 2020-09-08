import { CondicionAlimenticia, Vegano, Diabetico, Vegetariano, Hipertenso } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { Usuario } from './usuario'
import { Alimento } from './alimento'

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

    test('Usuario es saludable por condicion de Diabetico',() => {
        usuario1=new Usuario("Miguel Suarez", 71, 1.5)
        usuario1.agregarCondicion(new Diabetico)
        usuario1.rutina=Rutina.ACTIVO

        expect(true).toBe(usuario1.esSaludable())
    })

    test('Usuario no es saludable por condicion Diabetico',()=>{
        usuario1=new Usuario("Miguel Suarez", 71, 1.5)
        usuario1.agregarCondicion(new Diabetico)
        usuario1.rutina=Rutina.NADA

        expect(false).toBe(usuario1.esSaludable())
    })

    test('Usuario es saludable por condicion de Vegano', ()=>{
        usuario1=new Usuario("Carlos Tevez", 71, 1.5)
        usuario1.agregarCondicion(new Vegano)
        usuario1.agregarAlimentoPreferido(new Alimento("Pera",GrupoAlimenticio.GRUPO1))
        usuario1.agregarAlimentoPreferido(new Alimento("Menzana",GrupoAlimenticio.GRUPO1))

        expect(true).toBe(usuario1.esSaludable())
    })

    test('Usuario es no saludable por condicion de Vegano', ()=>{
        usuario1=new Usuario("Carlos Tevez", 71, 1.5)
        usuario1.agregarCondicion(new Vegano)
        usuario1.agregarAlimentoPreferido(new Alimento("Pera",GrupoAlimenticio.GRUPO1))
        

        expect(false).toBe(usuario1.esSaludable())
    })

    test('Usuario es saludable por condicion de Vegetariano',()=>{
        usuario1=new Usuario("Tom", 71, 1.5)
        usuario1.agregarCondicion(new Vegetariano)
        usuario1.agregarAlimentoPreferido(new Alimento("Manzana",GrupoAlimenticio.GRUPO1))
        
        expect(true).toBe(usuario1.esSaludable())
    })


    test('Usuario no es saludable por condicion de Vegetariano',()=>{
        usuario1=new Usuario("Tom", 71, 1.5)
        usuario1.agregarCondicion(new Vegetariano)
        usuario1.agregarAlimentoPreferido(new Alimento("Bizcocho de Grasa",GrupoAlimenticio.GRUPO5))
        
        expect(false).toBe(usuario1.esSaludable())
    })

    test('Usuario es saludable por condicion de Hipertenso', ()=>{
        usuario1=new Usuario("Nicolas", 71, 1.5)
        usuario1.agregarCondicion(new Hipertenso)
        usuario1.rutina=Rutina.INTENSIVO

        expect(true).toBe(usuario1.esSaludable())
    })

    test('Usuario no es saludable por condicion de Hipertenso', ()=>{
        usuario1=new Usuario("Nicolas", 71, 1.5)
        usuario1.agregarCondicion(new Hipertenso)
        usuario1.rutina=Rutina.MEDIANO

        expect(false).toBe(usuario1.esSaludable())
    })

    test('Usuario es saludable por condicion de Celiaco',()=>{
        usuario1=new Usuario("Ruperto", 71, 1.5)

        expect(true).toBe(usuario1.esSaludable())
    })


})