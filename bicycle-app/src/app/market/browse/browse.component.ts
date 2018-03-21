import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../../bicycle.service'; 


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  bikes: any[];
  id: any;
  constructor(private _bicycleService: BicycleService,) { }

  ngOnInit() {
    this.allBikes();
  }
  allBikes(){
    let tempObservable= this._bicycleService.allBikes();
    tempObservable.subscribe(data =>{
      this.bikes = data['data'];
      this.id = data['session']['id'];
    });
  }
  contact(bikeId: String){
    let tempObservable = this._bicycleService.contact(bikeId);
    tempObservable.subscribe(data =>{
      alert("Name:" + data['data'][0]['fname'] + " " +data['data'][0]['lname'] + " Email: " + data['data'][0]['email']);
    });
  }
}
