import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { CardrecetaComponent } from './componentes/cardreceta/cardreceta.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { CondicionesComponent } from './componentes/condiciones/condiciones.component';
import { AlimentosComponent } from './componentes/alimentos/alimentos.component';
import { RecetaPipe } from './pipes/receta.pipe';
import { RecetaComponent } from './componentes/receta/receta.component';
import { LoginComponent } from './componentes/login/login.component';
import { DatosperfilComponent } from './componentes/datosperfil/datosperfil.component';
import { AlimentosperfilComponent } from './componentes/alimentosperfil/alimentosperfil.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BusquedaComponent,
    ResultadosComponent,
    CardrecetaComponent,
    PerfilComponent,
    CondicionesComponent,
    AlimentosComponent,
    RecetaPipe,
    RecetaComponent,
    LoginComponent,
    DatosperfilComponent,
    AlimentosperfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
