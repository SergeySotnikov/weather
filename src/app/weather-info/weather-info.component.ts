import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.sass'],
})
export class WeatherInfoComponent {
  weatherInfo = new Subject<any>();
  cityName = '';
  temperatureCelsius: any;
  atmosphericPressure: any;
  humidity: any;
  windSpeed: any;

  constructor(private WeatherDataService: WeatherDataService) {
    this.weatherInfo = WeatherDataService.subject;
  }

  ngOnInit() {
    this.weatherInfo.subscribe((obj) => {
      this.cityName = obj.cityName;
      this.temperatureCelsius = obj.temperatureCelsius;
      this.atmosphericPressure = obj.atmosphericPressure;
      this.humidity = obj.humidity;
      this.windSpeed = obj.windSpeed;
    });
  }
}
