import { RecetaPipe } from './receta.pipe';
import { Receta } from 'src/domain/receta'
import { Usuario } from 'src/domain/usuario';

const usuarioGenerico = new Usuario("Pedro", 80, 1.7)
const recetas = [new Receta(new Usuario("German", 70, 1.8), "Milanesa"), new Receta(usuarioGenerico, "Mondongo"), new Receta(usuarioGenerico, "Guiso de lentejas")]
describe('RecetaPipe', () => {
  it('create an instance', () => {
    const pipe = new RecetaPipe();
    expect(pipe).toBeTruthy();
  });
});

  it('Devuelve la misma lista de recetas sin filter aplicado', () =>{
    const pipe = new RecetaPipe()
    const recetasFiltradas = pipe.transform(recetas, '')
    expect(recetasFiltradas.length).toBe(3)
  })

  it('Pipe filtra por nombre del Plato'), () => {
    filtrar('mila', 'Milanesa')
  }

  it('Pipe filtra por nombre del Autor'), () => {
    filtrar('ger', 'Milanesa')
  }


  const filtrar = (busqueda:string, nombreReceta:string) =>{
    const pipe = new RecetaPipe()
    const recetasFiltradas: Receta[] = pipe.transform(recetas, busqueda)
    expect(recetasFiltradas.length).toBe(1)
    const ultimaReceta = recetasFiltradas.pop()
    expect(ultimaReceta.nombreDelPlato).toBe(nombreReceta)

  }
