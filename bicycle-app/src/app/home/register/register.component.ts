import { Component, OnInit } from '@angular/core';
import { BicycleService } from './../../bicycle.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: String = "";
  lname: String = "";
  email: String = "";
  password: String = "";
  confirm: String = "";
  error = false;
  errorMessage = "";
  noMatchError=""
  uniqueError ="";

  constructor(
    private _bicycleService: BicycleService, 
    private _router: Router,     
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  add(){
    if (this.password != this.confirm){
      console.log('no matchhh');
      this.error = true;
      this.noMatchError="Passwords must match"
      console.log(this.noMatchError)
    } else {
      let tempObservable= this._bicycleService.newUser(
        {
          fname: this.fname, 
          lname: this.lname,
          email: this.email,
          password: this.password,
        }
      );
      tempObservable.subscribe(data =>{
        if (data['error']){
          this.error = true;
          // this.uniqueError = data['error']['errmsg'];
          this.errorMessage = data['error']['errors'];
          // console.log('errorMessage', this.errorMessage);
        } else {
          this._router.navigate(['/market']);
        }
      })
    }
  }
}
