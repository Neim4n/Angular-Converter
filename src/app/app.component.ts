import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';

import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-converter';
  convertorCurrencies: Array<any> = [];
  headerCurrencies: Array<any> = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getCurrencies()
  }


  getCurrencies() {
    const API_KEY = 'd2f4cfd984bd41f7b86b8a330b744dd3';
    const supported = this.http.get(`https://api.currencyfreaks.com/supported-currencies`);
    const latest = this.http.get(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}`);

    forkJoin([supported, latest]).subscribe((res: any) => {

      res[0].forEach((currency: any) => {
        if (currency.currencyCode === "USD" || currency.currencyCode === "EUR") {
          let defaultCurrency = {...currency};
          defaultCurrency.rate = convertCurrency(1, res[1].rates[currency.currencyCode], res[1].rates['UAH']);
          this.headerCurrencies.push(defaultCurrency)
        }

        currency.value = `${currency.currencyCode}-${+res[1].rates[currency.currencyCode]}`;
        this.convertorCurrencies.push(currency);
      })


      console.log(this.headerCurrencies);
      console.log(this.convertorCurrencies);
      console.log(res[0]);
      console.log(res[1]);
    });

    function convertCurrency(amount: any, currency1: any, currency2: any) {
      return amount / currency1 * currency2;
    }
  }
}
