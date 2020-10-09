import { CondicionAlimenticia } from './condicionAlimenticia';
import { GrupoAlimenticio } from './grupoAlimenticio';

export class Alimento {
  private listaInadecuado: CondicionAlimenticia[] = [];

  constructor(
    public nombreDeAlimento?: string,//? puede ser no asignada
    public grupoAlimenticio?: GrupoAlimenticio
  ) {}

   static fromJson(alimentoJSON): Alimento {
    return Object.assign(new Alimento(), alimentoJSON, {});
  }

  inadecuadoPara = (): CondicionAlimenticia[] => this.listaInadecuado;

  agregarInadecuado = (condicion: CondicionAlimenticia) =>
    this.listaInadecuado.push(condicion);
}
