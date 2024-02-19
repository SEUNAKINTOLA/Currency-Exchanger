import { Component, Input } from '@angular/core';
import { ConvertedValue } from '../models/currency.model';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {
  @Input()
  currency!: ConvertedValue;
}
