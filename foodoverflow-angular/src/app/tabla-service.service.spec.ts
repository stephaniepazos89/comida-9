import { TestBed } from '@angular/core/testing';

import { TablaServicioService } from './tabla-service.service';

describe('TablaServicioService', () => {
  let service: TablaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
