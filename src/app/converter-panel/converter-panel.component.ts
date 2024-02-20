import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { ConvertedValue, Currency } from '../models/currency.model';
import { Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnChanges  {
  defaultAmount: number = 1;
  convertedResult!: number;
  convertedValues: ConvertedValue[] = [];

  @Input() convertFromCurrency: string = 'EUR';
  @Input() convertToCurrency: string = 'USD';
  @Input() currencies: Currency[] = [];
  @Input() conversionRates: {[key: string]: number} = {};
  @Input() showDetailsButton: boolean = true;

  @Output() convertFromCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() convertToCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() defaultAmountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedResultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedValuesChange: EventEmitter<ConvertedValue[]> = new EventEmitter<ConvertedValue[]>();

  isAmountValid: boolean = !isNaN(this.defaultAmount) && this.defaultAmount > 0;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
      if (changes['currencies'] && changes['currencies'].currentValue.length > 0) {
        this.startConversion();
      }
    }

  swapCurrencies() {
    const tempCurrency = this.convertFromCurrency;
    this.convertFromCurrency = this.convertToCurrency;
    this.convertToCurrency = tempCurrency;
    this.startConversion();
  }

  startConversion() {
    const convertFromRate = this.conversionRates[this.convertFromCurrency];
    const convertToRate = this.conversionRates[this.convertToCurrency];
    this.convertedValues = [];
    this.currencies.slice(0, 9).forEach(toCurrency => {
      const value = (this.defaultAmount / convertFromRate) * this.conversionRates[toCurrency.code];
      this.convertedValues.push({
        convertFromCurrency: this.convertFromCurrency,
        convertToCurrency: toCurrency.code,
        convertFromRate: convertFromRate,
        convertToRate: this.conversionRates[toCurrency.code],
        value: value
      });
    });
    this.convertedValuesChange.emit(this.convertedValues);
    this.convertedResult = (this.defaultAmount / convertFromRate) * convertToRate;
    this.convertedResultChange.emit(this.convertedResult);
  }

  onConvertFromCurrencySelected(currencyCode: string) {
    this.convertFromCurrency = currencyCode;
    this.startConversion();
    this.convertFromCurrencyChange.emit(this.convertFromCurrency);
  }

  onConvertToCurrencySelected(currencyCode: string) {
    this.convertToCurrency = currencyCode;
    this.startConversion();
    this.convertToCurrencyChange.emit(this.convertToCurrency);
  }

  onAmountChange(amount: number) {
    this.isAmountValid = !isNaN(this.defaultAmount) && this.defaultAmount > 0;
    if (this.isAmountValid) {
      this.defaultAmountChange.emit(amount);
      this.startConversion();
    }
  }

  formatAmount(amount: number): number {
    return Number(amount?.toFixed(2)) || 0;
  }

  viewDetails() {
    const detailsUrl = `/details/${this.convertFromCurrency}/${this.convertToCurrency}`;
    this.sharedDataService.setCurrencies(this.currencies);
    this.sharedDataService.setConversionRates(this.conversionRates);
    this.router.navigate([detailsUrl]);
  }
}
