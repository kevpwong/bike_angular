import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../../bicycle.service'; 

@Component({
  selector: 'app-botd',
  templateUrl: './botd.component.html',
  styleUrls: ['./botd.component.css']
})
export class BotdComponent implements OnInit {
  bike: {};
  constructor(private _bicycleService: BicycleService,) { }

  ngOnInit() {
    this.botd();
  }
  
  botd(){
    let tempObservable = this._bicycleService.botd();
    tempObservable.subscribe(data =>{
      console.log(data);
      this.bike= data['data'];
      // alert("Name:" + data['data'][0]['fname'] + " " +data['data'][0]['lname'] + " Email: " + data['data'][0]['email']);
    });
  }
}
