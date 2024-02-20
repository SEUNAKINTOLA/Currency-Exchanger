import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent {
  @Input() defaultAmount: number = 1;
  @Input() convertedResult!: number;
  @Input() convertFromCurrency: string | undefined;
  @Input() convertToCurrency: string | undefined;
  @Input() currencies: Currency[] = [];
  @Output() convert: EventEmitter<void> = new EventEmitter<void>();
  @Output() convertFromCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() convertToCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() defaultAmountChange: EventEmitter<number> = new EventEmitter<number>();
  isAmountValid: boolean = !isNaN(this.defaultAmount) && this.defaultAmount > 0;

  swapCurrencies() {
    const tempCurrency = this.convertFromCurrency;
    this.convertFromCurrency = this.convertToCurrency;
    this.convertToCurrency = tempCurrency;
    this.startConversion();
  }

  startConversion() {
    this.convertFromCurrencyChange.emit(this.convertFromCurrency);
    this.convertToCurrencyChange.emit(this.convertToCurrency);
  }

  onConvertFromCurrencySelected(currencyCode: string) {
    this.convertFromCurrency = currencyCode;
    this.convertFromCurrencyChange.emit(this.convertFromCurrency);
  }

  onConvertToCurrencySelected(currencyCode: string) {
    this.convertToCurrency = currencyCode;
    this.convertToCurrencyChange.emit(this.convertToCurrency);
  }

  onAmountChange(amount:number) {
    this.defaultAmountChange.emit(amount)
    this.isAmountValid = !isNaN(this.defaultAmount) && this.defaultAmount > 0;
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2);
  }
}
