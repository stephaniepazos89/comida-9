import { CondicionAlimenticia, Vegano, Celiaco } from './condicionAlimenticia'
import { Rutina } from './rutina'
import { GrupoAlimenticio } from './grupoAlimenticio'
import { Usuario } from './usuario'
import { Alimento } from './alimento'
import { Receta } from './receta'
import { Ingrediente } from './ingrediente'

describe('Conjunto de Tests', () => {

    let usuario1: Usuario
    let usuario2: Usuario
    let receta1: Receta
    let alimento1: Alimento
    let alimento2: Alimento
    let ingrediente1: Ingrediente
    let ingrediente2: Ingrediente
    let condicion1: CondicionAlimenticia
    let condicion2: CondicionAlimenticia

    beforeEach(() => {
        usuario1 = new Usuario("Pedro", 80, 1.80)
        usuario2 = new Usuario("Jose", 75, 1.70)
        receta1 = new Receta(usuario1, "Milanesa con papas fritas")
        alimento1 = new Alimento("Milanesa", GrupoAlimenticio.GRUPO1)
        alimento2 = new Alimento("Papa", GrupoAlimenticio.GRUPO2)
        ingrediente1 = new Ingrediente(alimento1, 500)
        ingrediente2 = new Ingrediente(alimento2, 400)
        condicion1 = new Vegano()
        condicion2 = new Celiaco()

    })

    test('Test de Es editable por.. (Autores)', () => {
        expect(receta1.esEditablePor(usuario1)).toBe(true)
        expect(receta1.esEditablePor(usuario2)).toBe(false)
    })

    test('Test de Es editable por.. (Colaborador)', () => {
        receta1.agregarColaborador(usuario2)
        expect(receta1.esEditablePor(usuario2)).toBe(true)
    })

    test('Test de Es inadecuado para.. ', () => {
        ingrediente1.agregarInadecuado(condicion1)
        ingrediente2.agregarInadecuado(condicion2)
        receta1.agregarIngrediente(ingrediente1)
        receta1.agregarIngrediente(ingrediente2)
        expect(receta1.inadecuadoPara()).toContain(condicion1)
        expect(receta1.inadecuadoPara()).toContain(condicion2)
    })
    


})