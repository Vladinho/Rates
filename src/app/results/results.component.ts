import { Component, OnInit } from '@angular/core';
import {dataService} from '../exchange.service';
import {Router} from '@angular/router';
import {IRate} from '../IRate';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(private dataService: dataService, private router: Router) { }
  private currentPageIndex = 0;
  public back() {
    this.router.navigateByUrl('');
  }
  public open() {
    this.dataService.modalWindowIsShown = true;
  }
  test() {
    console.log(this.pageArray);
  }
}
