import {ChangeDetectorRef, Injectable} from '@angular/core';
import {CurrencyEnum} from './currencyEnum';
import {HttpClient} from '@angular/common/http';
import {IRate} from './IRate';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }
  private readonly PAGE_SIZE = 10;
  public pageArray: IRate[][] = [];
  public modalWindowIsShown = false;
  public currencies: CurrencyEnum[] = Object.values(CurrencyEnum);
  public currenciesFrom: CurrencyEnum[] = Object.values(CurrencyEnum);
  public currenciesTo: CurrencyEnum[] = Object.values(CurrencyEnum);
  public rates: IRate[] = [];
  public latestSameRates: IRate[] = [];
  public lastRate: IRate = {
    rate: null,
    date: '',
    from: null,
    to: null
  };
  public getRate(from: CurrencyEnum, to: CurrencyEnum) {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`);
  }
  public selectFrom(value: CurrencyEnum) {
    this.currenciesTo = this.currencies
        .map((i, index, array) => i === value ? array.splice(i, 1) : i);
  }
  public selectTo(value: CurrencyEnum) {
    this.currenciesFrom = this.currencies
        .map((i, index, array) => i === value ? array.splice(i, 1) : i);
  }
  public updatePageArray() {
    this.pageArray = this.rates.reduce((acc, cur, currentIndex) => {
      if (currentIndex % this.PAGE_SIZE === 0) {
        let newGroup = [cur];
        acc.push(newGroup);
      } else {
        acc[Math.floor(currentIndex / this.PAGE_SIZE)].push(cur);
      }
      return acc;
    }, []);
  }
}
