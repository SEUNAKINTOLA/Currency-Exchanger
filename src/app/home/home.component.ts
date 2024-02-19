import { Component, OnInit } from '@angular/core';
import { Currency, ConvertedValue } from '../models/currency.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defaultAmount: number = 1;
  convertFromCurrency: string = 'EUR';
  convertToCurrency: string = 'USD';
  currencies: Currency[] = [];
  convertedValues: ConvertedValue[] = [];

  constructor() {}

  ngOnInit() {
    this.getCurrencies();
    this.convert();
  }

  getCurrencies() {
    // Mock data for currencies
    this.currencies = [
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
      { code: 'GBP', name: 'British Pound' },
      { code: 'JPY', name: 'Japanese Yen' },
      { code: 'AUD', name: 'Australian Dollar' },
      { code: 'CAD', name: 'Canadian Dollar' },
      { code: 'CHF', name: 'Swiss Franc' },
      { code: 'CNY', name: 'Chinese Yuan' },
      { code: 'SEK', name: 'Swedish Krona' },
      // Add more currencies as needed
    ];
  }

  convert() {
    console.log("converting");
    console.log(this.defaultAmount);
    // Mock conversion rates
    const conversionRates: { [key: string]: number } = {
      'USD': 1,
      'EUR': 1.21, // Sample conversion rate for EUR to USD
      'GBP': 0.72,
      'JPY': 109.43,
      'AUD': 1.29,
      'CAD': 1.27,
      'CHF': 0.89,
      'CNY': 6.46,
      'SEK': 8.39,
      // Add more conversion rates as needed
    };

    this.convertedValues = [];

    // Only take the first 3 currencies for the grid
      this,this.currencies.forEach(toCurrency => {
        const convertFromCurrency = this.convertFromCurrency;
        const convertToCurrency = toCurrency.code;
        const convertFromRate = conversionRates[this.convertFromCurrency];
        const convertToRate = conversionRates[toCurrency.code];
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
