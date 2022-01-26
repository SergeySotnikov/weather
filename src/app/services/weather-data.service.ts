import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  cityName: any;

  domain = 'http://api.airvisual.com';
  APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';

  weatherInfo = {
    cityName: '',
    temperatureCelsius: 0,
    atmosphericPressure: 0,
    humidity: 0,
    windSpeed: 0,
    image: '',
  };
  subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  showWeather(event: any) {
    this.cityName = event.target.textContent;
    console.log(this.cityName);

    const endPointChoiceCities = `/v2/city?city=${this.cityName}&state=California&country=USA`;
    const url = `${this.domain}${endPointChoiceCities}${this.APIKey}`;

    this.http.get(url).subscribe((response: any) => {
      this.weatherInfo.cityName = response.data.city;
      this.weatherInfo.temperatureCelsius = response.data.current.weather.tp;
      this.weatherInfo.atmosphericPressure = response.data.current.weather.pr;
      this.weatherInfo.humidity = response.data.current.weather.hu;
      this.weatherInfo.windSpeed = response.data.current.weather.ws;
      this.subject.next(this.weatherInfo);
    });
  }

  showWeatherSelect(country: any, state: any, city: any) {
    const endPointChoiceCities = `/v2/city?city=${city}&state=${state}&country=${country}`;
    const url = `${this.domain}${endPointChoiceCities}${this.APIKey}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.weatherInfo.cityName = response.data.city;
        this.weatherInfo.temperatureCelsius = response.data.current.weather.tp;
        this.weatherInfo.atmosphericPressure = response.data.current.weather.pr;
        this.weatherInfo.humidity = response.data.current.weather.hu;
        this.weatherInfo.windSpeed = response.data.current.weather.ws;
        this.weatherInfo.image = response.data.current.weather.ic;
        this.subject.next(this.weatherInfo);
      });
  }
}
