import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './Componentes/footer/footer.component';
import { BusquedaComponent } from './Componentes/busqueda/busqueda.component';
import { ResultadosComponent } from './Componentes/resultados/resultados.component';
import { CardrecetaComponent } from './Componentes/cardreceta/cardreceta.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { CondicionesComponent } from './Componentes/condiciones/condiciones.component';
import { AlimentosComponent } from './Componentes/alimentos/alimentos.component';


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
    AlimentosComponent

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
