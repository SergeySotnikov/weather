import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherDataService } from './services/weather-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  cityList = [];

  constructor(
    private http: HttpClient,
    private WeatherDataService: WeatherDataService
  ) {}

  onClick() {
    this.WeatherDataService.showWeather(event);
  }

  ngOnInit() {
    this.http
      .get('http://api.airvisual.com/v2/cities?state=California&country=USA&key=85b08754-d67d-492f-ab21-e4fc4718756b')
      .subscribe((response: any) => {
        this.cityList = response.data.map((item: any) => item.city);
      });
  }
}
