/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlimentosperfilComponent } from '../alimentosperfil/alimentosperfil.component'
import { AlimentosComponent } from '../alimentos/alimentos.component'
import { TablaAlimentosComponent } from '../tabla-alimentos/tabla-alimentos.component'
import { UsuarioService } from 'src/app/services/usuario.service';
import { StubUsuarioService } from 'src/app/services/stub-usuario.service';

import { PerfilComponent } from './perfil.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RecetaService } from 'src/app/services/receta.service';
import { HttpClientModule } from '@angular/common/http';
import { StubRecetaService } from 'src/app/services/stub-receta.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComponent, 
        AlimentosperfilComponent, 
        AlimentosComponent, 
        TablaAlimentosComponent ],
        imports: [
          BrowserModule,
          FormsModule,
          AppRoutingModule,
          HttpClientModule
        ],
        // providers: [
        //   UsuarioService,
        //   RecetaService
        // ]
    })
    .compileComponents();

    TestBed.overrideComponent(PerfilComponent, {
      set: {
        providers: [
          { provide: UsuarioService, useClass: StubUsuarioService },
          { provide: RecetaService, useClass: StubRecetaService }
        ]
      }
    })

    fixture = TestBed.createComponent(PerfilComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component = fixture.componentInstance
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('El usuario tiene dos alimentos preferidos', () => {
    expect(component.usuarioPerfil.alimentosPreferidos.length).toBe(2)
  })

  it('El usuario tiene dos recetas asociadas', () => {
    expect(component.recetasDeUsuario.length).toBe(2)
  })

  it('Se quita una de las dos condiciones del usuario, quedando la restante', () => {
    const resultHtml = fixture.debugElement.nativeElement
    resultHtml.querySelector('[data-testid="condicion_diabetico"]').change()
    fixture.detectChanges()
    expect(component.usuarioPerfil.alimentosPreferidos.length).toBe(1)
    
  })
})
