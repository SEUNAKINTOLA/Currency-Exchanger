import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ConverterPanelComponent } from './converter-panel/converter-panel.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CurrencyCardComponent } from './currency-card/currency-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { CurrencyService } from './services/currency.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ConverterPanelComponent,
    CurrencyCardComponent,
    DetailsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
