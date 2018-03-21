import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { BrowseComponent } from './market/browse/browse.component';
import { ListingsComponent } from './market/listings/listings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'market', component: MarketComponent, 
    children:[
      { path: '', redirectTo: 'browse', pathMatch: 'full' },
      {path: 'browse', component: BrowseComponent},
      {path: 'listings', component: ListingsComponent},
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
