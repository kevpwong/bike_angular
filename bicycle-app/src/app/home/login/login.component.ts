import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../../bicycle.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String = "";
  password: String = "";
  error = false;
  errorMessage = "";

  constructor(
    private _bicycleService: BicycleService, 
    private _router: Router,     
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  login(){
    let tempObservable= this._bicycleService.login(this.email, {password: this.password});
    console.log("login on components");
    tempObservable.subscribe(data =>{
      console.log(data);
      console.log(data['error']);
      if (data['error']){
        this.error = true;
        this.errorMessage = data['error']['message'];
      } else {
        this._router.navigate(['/market']);
      }
    })
  }
}
