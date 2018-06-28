import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { DataProvider } from "../../providers/data/data";

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
  
  constructor(public navCtrl: NavController,private http:HttpClient,private dp:DataProvider ) {
  }

  convertBase()
  {
    this.http.get('https://exchangeratesapi.io/api/latest?base='+this.base).subscribe(
      (data)=>{
        this.obj=data;
        console.log(this.obj.rates);
        this.output=this.input*this.obj.rates[this.target];
        this.dp.history.push({base:this.base,input:this.input,target:this.target,output:this.output});
       // console.log(this.dp.history);
      }
    )
  }

  convertTarget()
  {
    this.http.get('https://exchangeratesapi.io/api/latest?base='+this.target).subscribe(
      (data)=>{
        this.obj=data;
        this.input=this.output*this.obj.rates[this.base];
        this.dp.history.push({base:this.target,input:this.output,target:this.base,output:this.input});
      }
    )
  }

}
