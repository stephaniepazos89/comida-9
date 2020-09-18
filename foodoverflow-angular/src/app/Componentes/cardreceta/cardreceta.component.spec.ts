import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardrecetaComponent } from './cardreceta.component';

describe('CardrecetaComponent', () => {
  let component: CardrecetaComponent;
  let fixture: ComponentFixture<CardrecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardrecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
