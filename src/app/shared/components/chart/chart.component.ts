import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() fromCurrency!: string;
  @Input() toCurrency!: string;
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.fetchHistoricalData();
  }

  fetchHistoricalData() {
    const currentDate = new Date();
    const promises: Promise<{ [key: string]: number }>[] = [];

    // Iterate over the previous 12 months from the current month
    for (let month = 0; month < 12; month++) {
      const currentMonth = currentDate.getMonth() - month;
      const endOfMonthDate = new Date(
        currentDate.getFullYear(),
        currentMonth,
        0
      );
      const formattedendOfMonthDate = endOfMonthDate
        .toISOString()
        .split('T')[0];

      // Create a promise for each month to fetch historical data
      promises.push(
        this.currencyService
          .getHistoricalData(
            this.fromCurrency,
            this.toCurrency,
            formattedendOfMonthDate
          )
          .toPromise() as Promise<{ [key: string]: number }>
      );
    }

    const fromCurrency: number[] = [];
    const toCurrency: number[] = [];
    Promise.all(promises)
      .then((monthlyData) => {
        monthlyData.reverse().forEach((data, index) => {
          const currentMonth = currentDate.getMonth() - (index + 1); //+1 because array index starts from 0, but month count from 1
          const rateDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - index,
            0
          );
          const monthLabel =
            this.getMonthName(currentMonth) + ' ' + rateDate.getFullYear();
          const monthValues = Object.values(data['rates']);

          this.lineChartLabels.push(monthLabel);
          fromCurrency.push(monthValues[0]);
          toCurrency.push(monthValues[1]);
        });
      })
      .catch((error) => {
        console.error('Error fetching historical data:', error);
      })
      .finally(() => {
        this.lineChartData.push({
          data: fromCurrency,
          label: this.fromCurrency,
        });
        this.lineChartData.push({ data: toCurrency, label: this.toCurrency });
      });
  }

  getMonthName(month: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const adjustedMonth = (month < 0 ? month + 12 : month) % 12; // Adjust negative months and handle overflow
    return months[adjustedMonth];
  }
}
