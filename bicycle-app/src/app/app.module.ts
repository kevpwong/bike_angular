import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BicycleService } from './bicycle.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BotdComponent } from './home/botd/botd.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { FormsModule } from '@angular/forms';
import { MarketComponent } from './market/market.component';
import { BrowseComponent } from './market/browse/browse.component';
import { ListingsComponent } from './market/listings/listings.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BotdComponent,
    LoginComponent,
    RegisterComponent,
    MarketComponent,
    BrowseComponent,
    ListingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BicycleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
