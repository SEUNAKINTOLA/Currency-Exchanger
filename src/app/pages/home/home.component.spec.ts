import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CurrencyService } from '../../shared/services/currency/currency.service';
import { of } from 'rxjs';
import { Currency, ConvertedValue } from '../../models/currency.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  template: ''
})
class MockCurrencyCardComponent {
  @Input() currency!: ConvertedValue;
}

@Component({
  selector: 'app-converter-panel',
  template: ''
})
class MockConverterPanelComponent {
  defaultAmount: number = 1;
  convertFromCurrency: string = 'EUR';
  convertedResult!: number;
  convertToCurrency: string = 'USD';
  @Input() currencies: Currency[] = [];
  @Input() conversionRates: {[key: string]: number} = {};

  @Output() convertFromCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() convertToCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() defaultAmountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedResultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedValuesChange: EventEmitter<ConvertedValue[]> = new EventEmitter<ConvertedValue[]>();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CurrencyService', ['getCurrencies','getCurrenciesRate']);
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, MockConverterPanelComponent, MockCurrencyCardComponent ],
      providers: [
        { provide: CurrencyService, useValue: spy }
      ]
    })
    .compileComponents();

    currencyServiceSpy = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Set up the spy to return an observable
    const currencies =
    {
      "USD": "United States Dollar",
      "EUR": "Euro",
     };
    const mockCurrenciesResponse = { success: true, symbols: currencies };
    currencyServiceSpy.getCurrencies.and.returnValue(of(mockCurrenciesResponse));

    const mockCurrenciesRateResponse = { success: true, rates: { USD: 1.0, EUR: 0.85 } };
    currencyServiceSpy.getCurrenciesRate.and.returnValue(of(mockCurrenciesRateResponse));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch currencies on initialization', () => {
    const currencies: Currency[] = [
      { code: 'USD', name: 'United States Dollar' },
      { code: 'EUR', name: 'Euro' }
    ];

    component.ngOnInit();

    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalled();
    expect(component.currencies).toEqual(currencies);
  });
});
