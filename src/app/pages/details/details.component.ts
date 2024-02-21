import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currency, ConvertedValue } from '../../models/currency.model';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  conversionRates: {[key: string]: number} = {};
  currencies: Currency[] = [];
  convertFromCurrency!: string;
  convertToCurrency!: string;
  convertedResult: number = 0;
  convertedValues: ConvertedValue[] = [];
  amount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
    ) { }

  ngOnInit(): void {

    this.sharedDataService.currencies$.subscribe(currencies => this.currencies = currencies);
    this.sharedDataService.conversionRates$.subscribe(conversionRates => this.conversionRates = conversionRates);
    this.route.params.subscribe(params => {
    this.convertFromCurrency = params['fromCurrency'];
    this.convertToCurrency = params['toCurrency'];
    });
    this.amount = this.route.snapshot.queryParams['amount'];
    console.log(this.amount);
  }

  onConvertFromCurrencyChange(selectedCurrency: string) {
    this.convertFromCurrency = selectedCurrency;
  }

  onConvertToCurrencyChange(selectedCurrency: string) {
    this.convertToCurrency = selectedCurrency;
  }

  onDefaultAmountChange(amount: number) {
  }

  onConvertedResultChange(result: number) {
  }

  handleConvertedValues(values: ConvertedValue[]) {
    this.convertedValues = values;
  }

  currencyNameFromCode(code : string){
    const selectedCurrency = this.currencies.find(currency => currency.code === code);
    return selectedCurrency?.name || "";
  }
}
