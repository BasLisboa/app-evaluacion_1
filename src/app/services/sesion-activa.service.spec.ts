import { TestBed } from '@angular/core/testing';

import { SesionActivaService } from './sesion-activa.service';

describe('SesionActivaService', () => {
  let service: SesionActivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionActivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
