import { Component, OnInit } from '@angular/core';
import { Currency, ConvertedValue } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';

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
  convertedValues: ConvertedValue[] = [];
  conversionRates: {[key: string]: number} = {};
  constructor(private currencyService:CurrencyService) {}

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.currencyService.getCurrencies().subscribe(response => {
      if (response.success) {
        const rates = response.rates;
        this.conversionRates = response.rates;
        this.currencies = Object.keys(rates).map(code => ({
          code,
          name: code
        }));
        this.convert();
      } else {
        console.error('Failed to fetch currencies');
      }
    }, error => {
      console.error('Error fetching currencies:', error);
    });
  }

  convert() {
    this.convertedValues = [];
    this.convertedResult = (this.defaultAmount / this.conversionRates[this.convertFromCurrency]) * this.conversionRates[this.convertToCurrency];

    console.log(this.convertedResult);
    console.log(this.convertFromCurrency);
    console.log(this.convertToCurrency);
    [...this.currencies.slice(0, 9)].forEach(toCurrency => {
      const convertFromCurrency = this.convertFromCurrency;
      const convertToCurrency = toCurrency.code;
      const convertFromRate = this.conversionRates[this.convertFromCurrency];
      const convertToRate = this.conversionRates[toCurrency.code];
      const value = (this.defaultAmount / convertFromRate) * convertToRate;
      this.convertedValues.push({ convertFromCurrency, convertToCurrency, convertFromRate, convertToRate, value: value });
    });
  }


  onConvertFromCurrencyChange(selectedCurrency: string) {
    this.convertFromCurrency = selectedCurrency;
    this.convert();
  }

  onConvertToCurrencyChange(selectedCurrency: string) {
    this.convertToCurrency = selectedCurrency;
    this.convert();
  }

  onDefaultAmountChange(amount: number) {
    this.defaultAmount = amount;
    this.convert();
  }
}
