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
    RecetaPipe

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
