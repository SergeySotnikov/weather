import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { HomeComponent } from './home/home.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: CityListComponent,
    path: 'city-list',
  },
  {
    component: WeatherInfoComponent,
    path: 'city-list/weather-info/:city',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
