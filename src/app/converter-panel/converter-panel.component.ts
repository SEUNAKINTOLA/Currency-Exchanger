import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent {
  @Input() defaultAmount: number | undefined;
  @Input() convertFromCurrency: string | undefined;
  @Input() convertToCurrency: string | undefined;
  @Input() currencies: Currency[] = [];
  @Output() convert: EventEmitter<void> = new EventEmitter<void>();
  @Output() convertFromCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() convertToCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() defaultAmountChange: EventEmitter<number> = new EventEmitter<number>();

  startConversion() {
    this.convertFromCurrencyChange.emit(this.convertFromCurrency);
    this.convertToCurrencyChange.emit(this.convertToCurrency);
    this.convert.emit();
  }

  onConvertFromCurrencySelected(currencyCode: string) {
    this.convertFromCurrency = currencyCode;
    this.convertFromCurrencyChange.emit(this.convertFromCurrency);
    this.convert.emit();
  }

  onConvertToCurrencySelected(currencyCode: string) {
    this.convertToCurrency = currencyCode;
    this.convertToCurrencyChange.emit(this.convertToCurrency);
    this.convert.emit();
  }
}
