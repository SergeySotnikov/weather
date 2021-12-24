import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.sass']
})
export class CityListComponent {

  cityList = [];

  constructor(
    private http: HttpClient,
    private weatherDataService: WeatherDataService
  ) {}

  onClick() {
    this.weatherDataService.showWeather(event);
  }

  ngOnInit() {
    const domain = 'http://api.airvisual.com';
    const endPointCities = '/v2/cities?state=California&country=USA';
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointCities}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      this.cityList = response.data.map((item: any) => item.city);
    });

  }

}
