import { Component, OnInit } from '@angular/core';
import {ExchangeService} from '../exchange.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IRate} from '../IRate';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(private exchangeService: ExchangeService, private router: Router) { }
  currencyForm: FormGroup;
  selectFrom: FormControl;
  selectTo: FormControl;
  ngOnInit() {
    this.selectFrom = new FormControl('', Validators.required);
    this.selectTo = new FormControl('', Validators.required);
    this.currencyForm = new FormGroup({
      selectFrom: this.selectFrom,
      selectTo: this.selectTo,
    });
  }
  private close() {
    this.exchangeService.modalWindowIsShown = false;
  }

  private toResults() {
    this.router.navigateByUrl('results');
    this.close();
  }

  onSubmit() {
    this.exchangeService.getRate(this.selectFrom.value, this.selectTo.value).subscribe((val) => {
          let rate: IRate = {
            rate: Object.values(val.rates)[0],
            date: val.date,
            from: val.base,
            to: Object.keys(val.rates)[0]
          };
          this.exchangeService.rates.unshift(rate);
          this.exchangeService.lastRate = rate;
          this.exchangeService.latestSameRates = this.exchangeService.rates
              .filter(i => i.from === rate.from && i.to === rate.to);
        },
        (e) => {
          console.error('Error: ', e);
        });
  }
}
