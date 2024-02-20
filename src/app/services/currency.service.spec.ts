import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
