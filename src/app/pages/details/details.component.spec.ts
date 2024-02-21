import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from './details.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency, ConvertedValue } from 'src/app/models/currency.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-chart',
  template: ''
})
class MockChartComponent {
  @Input() fromCurrency!: string;
  @Input() toCurrency!: string;
}


@Component({
  selector: 'app-converter-panel',
  template: ''
})
class MockConverterPanelComponent {
  convertedResult!: number;
  @Input() convertFromCurrency: string = 'EUR';
  @Input() convertToCurrency: string = 'USD';
  @Input() defaultAmount: number = 1;
  @Input() currencies: Currency[] = [];
  @Input() conversionRates: {[key: string]: number} = {};
  @Input() showDetailsButton: boolean = true;

  @Output() convertFromCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() convertToCurrencyChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() defaultAmountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedResultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() convertedValuesChange: EventEmitter<ConvertedValue[]> = new EventEmitter<ConvertedValue[]>();
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent, MockConverterPanelComponent, MockChartComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ fromCurrency: 'USD', toCurrency: 'EUR' }),
            snapshot: {
              queryParams: {
                amount: 100
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
