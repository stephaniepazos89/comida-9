import { CondicionAlimenticia } from './condicionAlimenticia';
import { GrupoAlimenticio } from './grupoAlimenticio';

export class Alimento {
  
  constructor(
    public id?: number,
    public nombreDeAlimento?: string,//? puede ser no asignada
    public grupoAlimenticio?: GrupoAlimenticio,
    public inadecuadoPara?: CondicionAlimenticia[],
  ) {}

   static fromJson(alimentoJSON): Alimento {
    return Object.assign(new Alimento(), alimentoJSON);
  }

  agregarInadecuado = (condicion: CondicionAlimenticia) =>
    this.inadecuadoPara.push(condicion);
}
