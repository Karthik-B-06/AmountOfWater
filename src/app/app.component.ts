import { Component } from '@angular/core';

import { NgModel, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { type } from 'os';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  sum: number;
  stack: Array<number> = [];
  arrStr: Array<Object>;
  errormessage: string = "none";
  row: number;
  Arr = Array;
  maxRi: number = 0;
  maxLe: number = 0;
  amount: Array<Object> = [];
  totalAmount : number;
  show: boolean = false;
  inputArray(form: NgForm) {
    this.errormessage = "none";
    var letters = new RegExp('[a-zA-Z]');
    console.log(letters.test(form.value.arrayValues.toString()));

    if(letters.test(form.value.arrayValues.toString())) {
      alert('Please enter only Numbers Separated by "," ');
      console.log("false");
    }
    else {
    this.stack = [];
    this.show = true;
    this.arrStr = [];
    this.row = 0;
    this.amount = [];
    this.totalAmount = 0;
    this.amount.push(0);
    this.sum = 0;
    this.arrStr = form.value.arrayValues.split(",");
    //console.log(this.arrStr[this.arrStr.length-1].toString() + " " + typeof this.arrStr);
    let max = -1;

    for(var i=0; i<this.arrStr.length; i++) {
      if( parseInt(this.arrStr[i].toString()) > max ) max = parseInt(this.arrStr[i].toString());
    }
    this.row = max;

    for(var i=1; i<this.arrStr.length-1; i++) {
      this.maxLe = 0;
      this.maxRi = 0;
      for(var j=0; j<=i; j++) {
        this.maxLe = Math.max(this.maxLe, parseInt(this.arrStr[j].toString()));
      }
      for(var j=this.arrStr.length-1; j>=i; j--) {
        this.maxRi = Math.max(this.maxRi,parseInt(this.arrStr[j].toString()));
      }
      this.amount.push(Math.min(this.maxLe,this.maxRi) - parseInt(this.arrStr[i].toString()));
      this.sum += Math.min(this.maxLe,this.maxRi) - parseInt(this.arrStr[i].toString());
    }
    this.amount.push(0);
    
    if(isNaN(this.sum)) {
      alert("Input Entered Incorrectly");
    }
    else {
      this.calculateStackApproach(this.arrStr);
    }
    console.log(this.amount);

    }
  }



  calculateStackApproach(array: Array<Object>) {

    for(var i=0; i<array.length; i++) {

      while(this.stack.length > 0 && parseInt(array[i].toString()) > parseInt(array[this.stack[this.stack.length-1]].toString()) ) {
        var top = this.stack[this.stack.length-1];
        this.stack.pop();
        if(this.stack.length == 0) break;

        var dist = i - this.stack[this.stack.length-1] - 1;
        var height = Math.min( parseInt(array[i].toString()), parseInt(array[this.stack[this.stack.length-1]].toString()) ) -   parseInt(array[top].toString());
        this.totalAmount += dist * height;
      } 

      this.stack.push(i);


    }


}

}
