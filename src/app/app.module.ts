import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainButtonComponent } from './main-button/main-button.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { ResultsComponent } from './results/results.component';
import {Routes, RouterModule} from '@angular/router';
import {DataService} from './exchange.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: MainButtonComponent},
  {path: 'results', component: ResultsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainButtonComponent,
    ModalWindowComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
