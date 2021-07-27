/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssentamentoService } from './assentamento.service';

describe('Service: Assentamento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssentamentoService]
    });
  });

  it('should ...', inject([AssentamentoService], (service: AssentamentoService) => {
    expect(service).toBeTruthy();
  }));
});
