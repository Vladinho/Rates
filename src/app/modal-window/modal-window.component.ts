import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IRate} from '../IRate';
import {CurrencyEnum} from '../currencyEnum';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(private dataService: DataService,
              private router: Router) { }
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
    this.dataService.modalWindowIsShown = false;
  }

  private toResults() {
    this.router.navigateByUrl('results');
    this.close();
  }

  public onSubmit() {
    this.dataService.isLoading = true;
    this.dataService.getRate(this.selectFrom.value, this.selectTo.value).subscribe((val) => {
          let rate: IRate = {
            rate: Object.values(val.rates)[0] as number,
            date: val.date,
            from: val.base,
            to: Object.keys(val.rates)[0] as CurrencyEnum
          };
          this.dataService.update(rate);
          this.dataService.isLoading = false;
        },
        (e) => {
          console.error('Error: ', e);
          this.dataService.isLoading = false;
        });
  }
}
