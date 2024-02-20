import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://data.fixer.io/api/latest';
  private apiKey = '3f1f2a44ed9e0f0cb71c38c25d983f27';//'8e63ce13dea7d40e2e276a297009f199';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  convertCurrency(convertFrom: string, convertTo: string): Observable<any> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}&base=${convertFrom}&symbols=${convertTo}`;
    return this.http.get<any>(url);
  }
}
