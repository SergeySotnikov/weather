import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  cityName: any;

  weatherInfo = {
    cityName: '',
    temperatureCelsius: 0,
    atmosphericPressure: 0,
    humidity: 0,
    windSpeed: 0,
  };
  subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  showWeather(event: any) {
    this.cityName = event.target.textContent;
    console.log(this.cityName);
    this.http
      .get(
        `http://api.airvisual.com/v2/city?city=${this.cityName}&state=California&country=USA&key=85b08754-d67d-492f-ab21-e4fc4718756b`
      )
      .subscribe((response: any) => {
        this.weatherInfo.cityName = response.data.city;
        this.weatherInfo.temperatureCelsius = response.data.current.weather.tp;
        this.weatherInfo.atmosphericPressure = response.data.current.weather.pr;
        this.weatherInfo.humidity = response.data.current.weather.hu;
        this.weatherInfo.windSpeed = response.data.current.weather.ws;
        console.log(this.weatherInfo);
        this.subject.next(this.weatherInfo);
      });
  }
}
