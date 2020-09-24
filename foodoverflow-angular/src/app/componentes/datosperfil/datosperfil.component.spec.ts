/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatosperfilComponent } from './datosperfil.component';

describe('DatosperfilComponent', () => {
  let component: DatosperfilComponent;
  let fixture: ComponentFixture<DatosperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
