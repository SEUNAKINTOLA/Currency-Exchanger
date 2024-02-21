import { Component, OnInit } from '@angular/core';
import { Currency, ConvertedValue } from '../../models/currency.model';
import { CurrencyService } from '../../shared/services/currency/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defaultAmount: number = 1;
  convertedResult!: number;
  convertFromCurrency: string = 'EUR';
  convertToCurrency: string = 'USD';
  currencies: Currency[] = [];
  conversionRates: {[key: string]: number} = {};
  convertedValues: ConvertedValue[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.currencyService.getCurrencies().subscribe(response => {
      if (response.success) {
        this.currencies = Object.keys(response.symbols).map(code => ({
          code: code,
          name: response.symbols[code]
        }));
      } else {
        console.error('Failed to fetch currencies');
      }
    }, error => {
      console.error('Error fetching currencies:', error);
    });

    this.currencyService.getCurrenciesRate().subscribe(response => {
      if (response.success) {
        this.conversionRates = response.rates;
      } else {
        console.error('Failed to fetch currencies');
      }
    }, error => {
      console.error('Error fetching currencies:', error);
    });


  }

  onConvertFromCurrencyChange(selectedCurrency: string) {
    this.convertFromCurrency = selectedCurrency;
  }

  onConvertToCurrencyChange(selectedCurrency: string) {
    this.convertToCurrency = selectedCurrency;
  }

  onDefaultAmountChange(amount: number) {
    this.defaultAmount = amount;
  }

  onConvertedResultChange(result: number) {
    this.convertedResult = result;
  }

  handleConvertedValues(convertedValues: ConvertedValue[]) {
    this.convertedValues = convertedValues;
  }
}
