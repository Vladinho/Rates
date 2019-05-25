import { Component, OnInit } from '@angular/core';
import {ExchangeService} from '../exchange.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private exchangeService: ExchangeService, private router: Router) { }
  public back() {
    this.router.navigateByUrl('');
  }
  public open() {
    this.exchangeService.modalWindowIsShown = true;
  }
}
