import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../../../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private currenciesSubject = new BehaviorSubject<Currency[]>([]);
  currencies$ = this.currenciesSubject.asObservable();

  private conversionRatesSubject = new BehaviorSubject<{[key: string]: number}>({});
  conversionRates$ = this.conversionRatesSubject.asObservable();

  constructor() {}

  setCurrencies(currencies: Currency[]) {
    this.currenciesSubject.next(currencies);
  }

  setConversionRates(conversionRates: {[key: string]: number}) {
    this.conversionRatesSubject.next(conversionRates);
  }
}
