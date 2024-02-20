import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CurrencyService } from '../services/currency.service';
import { of } from 'rxjs';
import { Currency, ConvertedValue } from '../models/currency.model';

// Create a mock component for ConverterPanelComponent
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-currency-card',
  template: ''
})
class MockCurrencyCardComponent {
  @Input() currency: any;
}


@Component({
  selector: 'app-converter-panel',
  template: ''
})
class MockConverterPanelComponent {
  @Input()
  defaultAmount!: number;
  @Input() convertedResult: any;
  @Input() convertFromCurrency!: string;
  @Input() convertToCurrency!: string;
  @Input() currencies!: any[];
  @Output() convert = new EventEmitter<void>();
  @Output() convertFromCurrencyChange = new EventEmitter<string>();
  @Output() convertToCurrencyChange = new EventEmitter<string>();
  @Output() defaultAmountChange = new EventEmitter<number>();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CurrencyService', ['getCurrencies']);
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
    const mockResponse = { success: true, rates: { USD: 1.0, EUR: 0.85 } };
    currencyServiceSpy.getCurrencies.and.returnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch currencies on initialization', () => {
    const currencies: Currency[] = [
      { code: 'USD', name: 'USD' },
      { code: 'EUR', name: 'EUR' }
    ];

    component.ngOnInit();

    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalled();
    expect(component.currencies).toEqual(currencies);
  });

  it('should update converted values on currency conversion', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.onDefaultAmountChange(10);
    fixture.detectChanges();

    expect(component.convertedValues.length).toBeGreaterThan(0);
  });

  it('should update converted result on currency conversion', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.onDefaultAmountChange(10);
    fixture.detectChanges();

    expect(component.convertedResult).toBeDefined();
  });

  it('should update converted result when currency selection changes', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.onConvertFromCurrencyChange('USD');
    fixture.detectChanges();

    expect(component.convertedResult).toBeDefined();
  });
});
