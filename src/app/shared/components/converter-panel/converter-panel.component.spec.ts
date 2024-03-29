import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ConverterPanelComponent } from './converter-panel.component';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

describe('ConverterPanelComponent', () => {
  let component: ConverterPanelComponent;
  let fixture: ComponentFixture<ConverterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverterPanelComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatOptionModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterPanelComponent);
    component = fixture.componentInstance;
    component.defaultAmount = 1;
    component.convertedResult = 0;
    component.convertFromCurrency = '';
    component.convertToCurrency = '';
    component.currencies = [
      { code: 'USD', name: 'USD' },
      { code: 'EUR', name: 'EUR' }
    ];
    component.conversionRates = {
      'USD': 1.0,
      'EUR': 0.83,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should swap currencies', () => {
    component.convertFromCurrency = 'USD';
    component.convertToCurrency = 'EUR';
    component.swapCurrencies();
    expect(component.convertFromCurrency).toEqual('EUR');
    expect(component.convertToCurrency).toEqual('USD');
  });

  it('should start conversion', () => {
    spyOn(component.convertedValuesChange, 'emit');
    spyOn(component.convertedResultChange, 'emit');
    component.convertFromCurrency = 'USD';
    component.convertToCurrency = 'EUR';
    component.startConversion();
    expect(component.convertedValuesChange.emit).toHaveBeenCalled();
    expect(component.convertedResultChange.emit).toHaveBeenCalled();
  });

  it('should handle convert from currency selection', () => {
    spyOn(component.convertFromCurrencyChange, 'emit');
    const currencyCode = 'USD';
    component.onConvertFromCurrencySelected(currencyCode);
    expect(component.convertFromCurrency).toEqual(currencyCode);
    expect(component.convertFromCurrencyChange.emit).toHaveBeenCalledWith(currencyCode);
  });

  it('should handle convert to currency selection', () => {
    spyOn(component.convertToCurrencyChange, 'emit');
    const currencyCode = 'EUR';
    component.onConvertToCurrencySelected(currencyCode);
    expect(component.convertToCurrency).toEqual(currencyCode);
    expect(component.convertToCurrencyChange.emit).toHaveBeenCalledWith(currencyCode);

  });

  it('should handle amount change', () => {
    spyOn(component.defaultAmountChange, 'emit');
    const amount = 10;

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    // Simulate user input in the input field
    inputElement.value = amount.toString();
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Verify that the component updates accordingly
    expect(component.defaultAmount).toEqual(amount);
    expect(component.defaultAmountChange.emit).toHaveBeenCalledWith(amount);
    expect(component.isAmountValid).toBeTruthy();
  });

  it('should format amount correctly', () => {
    const amount = 10.1234;
    const formattedAmount = component.formatAmount(amount);
    expect(formattedAmount).toEqual(10.12);
  });

  it('should update converted values on currency conversion', () => {
    fixture.detectChanges();

    component.onAmountChange(10);
    fixture.detectChanges();

    expect(component.convertedValues.length).toBeGreaterThan(0);
  });

  it('should update converted result on currency conversion', () => {
    fixture.detectChanges();

    component.onAmountChange(10);
    fixture.detectChanges();

    expect(component.convertedResult).toBeDefined();
  });

  it('should update converted result when currency selection changes', () => {
    fixture.detectChanges();

    component.onConvertFromCurrencySelected('USD');
    fixture.detectChanges();

    expect(component.convertedResult).toBeDefined();
  });
});
