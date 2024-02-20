import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyCardComponent } from './currency-card.component';
import { ConvertedValue } from '../models/currency.model';

describe('CurrencyCardComponent', () => {
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyCardComponent);
    component = fixture.componentInstance;

    // Provide a mock value for the currency input property
    component.currency = {
      convertToCurrency: 'USD',
      convertFromCurrency: 'EUR',
      convertFromRate: 1,
      convertToRate: 0.9,
      value: 100
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
