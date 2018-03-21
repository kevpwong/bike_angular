import { Component } from '@angular/core';
import { BicycleService } from './bicycle.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _bicycleService: BicycleService){}

}
