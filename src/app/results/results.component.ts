import { Component, OnInit } from '@angular/core';
import {ExchangeService} from '../exchange.service';
import {Router} from '@angular/router';
import {IRate} from '../IRate';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private exchangeService: ExchangeService, private router: Router) { }
  private pageArray: IRate[][] = this.exchangeService.rates.reduce((acc, cur, currentIndex) => {
    if (currentIndex % 10 === 0) {
      let newGroup = [cur];
      acc.push(newGroup);
    } else {
      acc[Math.floor(currentIndex / 10)].push(cur);
    }
    return acc;
  }, []);
  private currentPageIndex = 0;
  public back() {
    this.router.navigateByUrl('');
  }
  public open() {
    this.exchangeService.modalWindowIsShown = true;
  }
  test() {
    console.log(this.pageArray);
  }
}
