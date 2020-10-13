import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RecetaService } from 'src/app/services/receta.service';
import { RoutingService } from 'src/app/services/routing.service';
import { StubRecetaService } from 'src/app/services/stub-receta.service';
import { StubUsuarioService } from 'src/app/services/stub-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CardrecetaComponent } from '../cardreceta/cardreceta.component';
import { HeaderComponent } from '../header/header.component';
import { ResultadosComponent } from '../resultados/resultados.component';
import { BusquedaComponent } from './busqueda.component';


describe('BusquedaComponent', () => {
  let component: BusquedaComponent;
  let fixture: ComponentFixture<BusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaComponent, ResultadosComponent, CardrecetaComponent, HeaderComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
      ],
      providers: [
        UsuarioService,
        RecetaService,
        RoutingService
      ]

    })
    .compileComponents()
    TestBed.overrideComponent(BusquedaComponent, {
      set: {
        providers: [
          { provide: RecetaService, useClass: StubRecetaService },
          { provide: UsuarioService, useClass: StubUsuarioService }
        ]
      }
    })
    fixture = TestBed.createComponent(BusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Muestra inicialmente 4 recetas creadas en Stub', async () => {
    expect(4).toBe(component.recetas.length)
  })

  it('Busca tareas que contengan palabra Milanesa y encuentra dos', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    component.recetaBuscada = "Milanesa"
    resultHtml.querySelector('[data-testid="buscador"]').click()
    fixture.detectChanges()
    expect(resultHtml.querySelectorAll('[data-testid="filarecetas"]').length).toBe(4)
  })
});
