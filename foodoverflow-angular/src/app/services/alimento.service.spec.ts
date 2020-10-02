//import { inject } from '@angular/core';
import { TestBed,inject } from '@angular/core/testing';
import { AlimentoService } from './alimento.service';

describe('AlimentoService', () => {
  let service: AlimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlimentoService]
    });
  
  });

  it('should be created', inject([AlimentoService], (service: AlimentoService) => {
    expect(service).toBeTruthy();
  })
});
