import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BicycleService {

  constructor(private _http: HttpClient) { }
  newUser(newUser: {}){
    return this._http.post('/newUser/', newUser);
  }
  login(email: String, password: {}){
    return this._http.post("/login/"+email, password);
  }
  newListing(newListing: {}){
    return this._http.post('/newListing/', newListing);
  }
  allBikes(){
    return this._http.get('/allBikes');
  }
  myListings(){
    return this._http.get('/myListings/');
  }
  contact(bikeId: String){
    return this._http.get('/userInfo/'+bikeId);
  }
  update(bikeId: String, editBike: {}){
    return this._http.put('/editBike/'+bikeId, editBike);
  }
  remove(bikeId: String){
    return this._http.delete('/removeBike/'+bikeId);
  }
  botd(){
    return this._http.get('/botd/');
  }
  logout(){
    return this._http.get('/logout/');
  }
  
}
