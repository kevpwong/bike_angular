import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../../bicycle.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  title: String = "";
  price: String = "";
  location: String = "";
  url: String = "";
  description: String = "";
  listings: any[];
  error = false;
  errorMessage = "";

  // onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }

  constructor(
    private _bicycleService: BicycleService,
    private _router: Router,     
    private _route: ActivatedRoute,) { }

  ngOnInit() {
    this.myListings();
  }
  newListing(){
    let tempObservable= this._bicycleService.newListing(
      {
        title: this.title,
        price: this.price,
        location: this.location,
        url: this.url,
        description: this.description,
      }
    );
    tempObservable.subscribe(data =>{
      if (data['error']){
        this.error = true;
        this.errorMessage = data['error']['message'];
      } else {
        this._router.navigate(['/market']);
      }
    })
  }
  myListings(){
    let tempObservable = this._bicycleService.myListings();
    tempObservable.subscribe(data=>{
      this.listings = data['data']['bikes'];
    })
  }
  update(bikeId: String, bike: any){
    let tempObservable = this._bicycleService.update(bikeId, bike);
    tempObservable.subscribe(data=>{
      this.myListings();
    })
  }
  remove(bikeId: String){
    let tempObservable = this._bicycleService.remove(bikeId);
    tempObservable.subscribe(data=>{
      this.myListings();
    })
  }


}
