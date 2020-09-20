/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CondicionService } from './condicion.service';

describe('Service: Condicion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CondicionService]
    });
  });

  it('should ...', inject([CondicionService], (service: CondicionService) => {
    expect(service).toBeTruthy();
  }));
});
