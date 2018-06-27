import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  base;
  input;
  target;
  output;
  obj;
  codes=["USD","AUD","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","ZAR","EUR"];
  
  constructor(public navCtrl: NavController,private http:HttpClient) {
  }

  convertBase()
  {
    this.http.get('https://exchangeratesapi.io/api/latest?base='+this.base).subscribe(
      (data)=>{
        this.obj=data;
        console.log(this.obj.rates);
        this.output=this.input*this.obj.rates[this.target];
      }
    )
  }

  convertTarget()
  {
    this.http.get('https://exchangeratesapi.io/api/latest?base='+this.target).subscribe(
      (data)=>{
        this.obj=data;
        this.input=this.output*this.obj.rates[this.base];
      }
    )
  }

}
