import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../bicycle.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor( 
    private _bicycleService: BicycleService,
    private _router: Router,     
    private _route: ActivatedRoute,) { }

  ngOnInit() {
  }
  logoff(){
    let tempObservable = this._bicycleService.logout();
    tempObservable.subscribe(data=>{
      this._router.navigate(['/home']);
    })
  }
}
