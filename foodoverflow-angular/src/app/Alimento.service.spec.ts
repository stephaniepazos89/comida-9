import { TestBed } from '@angular/core/testing';

import { AlimentoService } from './Alimento.service';

describe('AlimentoService', () => {
  let service: AlimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
