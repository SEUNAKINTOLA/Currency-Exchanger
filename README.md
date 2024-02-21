# Currency Conversion App

This Angular application allows users to convert currencies, view historical data, and see currency conversion rates.

## Features

- Currency Converter: Convert between different currencies using real-time exchange rates.
- Historical Data: View historical exchange rates for selected currencies over the past year.
- Currency Details: See detailed information about specific currencies.
- Responsive Design: Works well on both desktop and mobile devices.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd currency-conversion-app`
3. Install dependencies: `npm install`
4. Create `src/environments/environment.dev.ts` and fill it with the following content:
```typescript
export const environment = {
  production: false,
  fixerApiBaseUrl: 'http://data.fixer.io/api',
  apiKey: 'YOUR_API_KEY_HERE', // Replace 'YOUR_API_KEY_HERE' with your actual Fixer API key
};
```

## Usage

1. Start the development server: `ng serve`
2. Open your browser and go to `http://localhost:4200`
3. Select the currency you want to convert from and to using the dropdown menus.
4. Enter the amount you want to convert in the input field.
5. View the converted values for the nine most popular currencies in the cards grid.

## Dependencies

- Angular: The core framework for building the application.
- ng2-charts: Used for displaying charts and graphs.
- chart.js: Provides the underlying charting functionality for ng2-charts.
- Angular Material: Provides UI components for building the user interface.
