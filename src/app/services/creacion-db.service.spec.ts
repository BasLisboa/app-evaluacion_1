import { TestBed } from '@angular/core/testing';

import { CreacionDBService } from './creacion-db.service';

describe('CreacionDBService', () => {
  let service: CreacionDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreacionDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
