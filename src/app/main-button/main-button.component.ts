import {Component, OnChanges, OnInit} from '@angular/core';
import {dataService} from '../exchange.service';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent {
  private from = '--';
  private to = '--';
  private rate: number;

  constructor(private dataService: dataService) {
  }
  public openModalWindow() {
        this.dataService.modalWindowIsShown = true;
  }
}
