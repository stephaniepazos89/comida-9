import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RecetaService } from 'src/app/services/receta.service';
import { RoutingService } from 'src/app/services/routing.service';
import { StubRecetaService } from 'src/app/services/stub-receta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RecetaComponent } from './receta.component';


describe('RecetaComponent', () => {
  let component: RecetaComponent;
  let fixture: ComponentFixture<RecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaComponent, HeaderComponent],
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

    TestBed.overrideComponent(RecetaComponent, {
      set: {
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: { 'id': 1 },
              }
            }
          },
          { provide: RecetaService, useClass: StubRecetaService }
          //{ provide: UsuariosService, useClass: StubUsuariosService }
        ]
      }
    })
  fixture = TestBed.createComponent(RecetaComponent)
  component = fixture.componentInstance
  await component.observableRouting()
})


it('should create', () => {
  fixture.detectChanges()
  expect(component).toBeTruthy()
})

})