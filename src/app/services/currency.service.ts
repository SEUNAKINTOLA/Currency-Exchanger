import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = environment.fixerApiBaseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    const url = `${this.apiUrl}/symbols?access_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getCurrenciesRate(): Observable<any> {
    const url = `${this.apiUrl}/latest?access_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  convertCurrency(convertFrom: string, convertTo: string): Observable<any> {
    const url = `${this.apiUrl}/latest?access_key=${this.apiKey}&base=${convertFrom}&symbols=${convertTo}`;
    return this.http.get<any>(url);
  }
  getHistoricalData(fromCurrency: string, toCurrency: string, date:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${date}?access_key=${this.apiKey}&base=EUR&symbols=${fromCurrency},${toCurrency}`);
  }
}
