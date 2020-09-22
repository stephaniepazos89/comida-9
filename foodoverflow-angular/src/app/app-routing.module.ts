import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { RecetaComponent } from './componentes/receta/receta.component';
import { AlimentosComponent } from './componentes/alimentos/alimentos.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'busqueda', component: BusquedaComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: 'receta/:nombreDelPlato', component: RecetaComponent },
  { path: 'alimento', component: AlimentosComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
