export interface Currency {
  code: string;
  name: string;
}

export interface ConvertedValue {
  convertFromCurrency: string;
  convertToCurrency: string;
  convertFromRate: number;
  convertToRate: number;
  value: number;
}
