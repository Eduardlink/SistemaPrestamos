import { TestBed } from '@angular/core/testing';

import { CobrosIndirectosService } from './cobros-indirectos.service';

describe('CobrosIndirectosService', () => {
  let service: CobrosIndirectosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobrosIndirectosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
