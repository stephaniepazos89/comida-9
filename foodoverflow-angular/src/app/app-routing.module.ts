import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { AlimentosComponent } from './componentes/alimentos/alimentos.component';

const routes: Routes = [
  { path: '', component: BusquedaComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: 'alimento', component: AlimentosComponent },
  { path: '**', redirectTo: '/perfil', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
