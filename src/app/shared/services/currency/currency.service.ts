/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = environment.fixerApiBaseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    const url = `${this.apiUrl}/symbols?access_key=${this.apiKey}`;
    return this.fetchData(url, 'currencies');
  }

  getCurrenciesRate(): Observable<any> {
    const url = `${this.apiUrl}/latest?access_key=${this.apiKey}`;
    return this.fetchData(url, 'currenciesRate');
  }

  convertCurrency(convertFrom: string, convertTo: string): Observable<any> {
    const url = `${this.apiUrl}/latest?access_key=${this.apiKey}&base=${convertFrom}&symbols=${convertTo}`;
    return this.fetchData(url, 'conversion'+convertFrom+convertTo);
  }

  getHistoricalData(fromCurrency: string, toCurrency: string, date: string): Observable<any> {
    const url = `${this.apiUrl}/${date}?access_key=${this.apiKey}&base=EUR&symbols=${fromCurrency},${toCurrency}`;
    return this.fetchData(url, 'historicalData'+date+fromCurrency+toCurrency);
  }

  private fetchData(url: string, storageKey: string): Observable<any> {
    const cachedData = this.getCachedData(storageKey);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(url).pipe(
      map(data => {
        this.cacheData(storageKey, data);
        return data;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  private cacheData(key: string, data: any) {
    const storageData = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(key, JSON.stringify(storageData));
  }

  private getCachedData(key: string): any | null {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const storageData = JSON.parse(storedData);
      const timestamp = storageData.timestamp;
      const expirationTime = 60 * 60 * 1000; // 60 minutes in milliseconds

      if (new Date().getTime() - timestamp < expirationTime) {
        return storageData.data;
      } else {
        localStorage.removeItem(key);
      }
    }

    return null;
  }
}
