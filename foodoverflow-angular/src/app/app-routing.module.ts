import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { BusquedaComponent } from './Componentes/busqueda/busqueda.component';

const routes: Routes = [
  { path: '', component: BusquedaComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '/perfil', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
