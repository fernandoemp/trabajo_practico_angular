import { TestBed } from '@angular/core/testing';

import { VentaPasajesService } from './venta-pasajes.service';

describe('VentaPasajesService', () => {
  let service: VentaPasajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaPasajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
