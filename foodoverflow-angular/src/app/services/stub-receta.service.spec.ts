import { TestBed } from '@angular/core/testing';

import { StubRecetaService } from './stub-receta.service';

describe('StubRecetaService', () => {
  let service: StubRecetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StubRecetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
