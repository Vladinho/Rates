import {ChangeDetectorRef, Injectable} from '@angular/core';
import {CurrencyEnum} from './currencyEnum';
import {HttpClient} from '@angular/common/http';
import {IRate} from './IRate';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }
  private readonly PAGE_SIZE = 10;
  public isLoading = false;
  public pageArray: IRate[][] = [];
  public modalWindowIsShown = false;
  public currencies: CurrencyEnum[] = Object.values(CurrencyEnum);
  public rates: IRate[] = [];
  public latestSameRates: IRate[] = [];
  public lastRate: IRate = {
    rate: null,
    date: '',
    from: null,
    to: null
  };
  public getRate(from: CurrencyEnum, to: CurrencyEnum): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`);
  }
  public updatePageArray() {
    this.pageArray = this.rates.reduce((acc, cur, currentIndex) => {
      if (currentIndex % this.PAGE_SIZE === 0) {
        const newGroup = [cur];
        acc.push(newGroup);
      } else {
        acc[Math.floor(currentIndex / this.PAGE_SIZE)].push(cur);
      }
      return acc;
    }, []);
  }
  public update(rate: IRate) {
    this.rates.unshift(rate);
    this.updatePageArray();
    this.lastRate = rate;
    this.latestSameRates = this.rates
        .filter(i => i.from === rate.from && i.to === rate.to);
  }
}
