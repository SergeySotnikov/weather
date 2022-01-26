import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private weatherDataService: WeatherDataService
  ) {}

  domain = 'http://api.airvisual.com';
  APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  countryList = [];
  stateList = [];
  cityList = [];

  getStateList(country: String) {
    this.stateList = [];
    this.selectedState = '';
    this.selectedCity = '';

    const endPointState = `/v2/states?country=${country}`;
    const url = `${this.domain}${endPointState}${this.APIKey}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.stateList = response.data.map((item: any) => item.state);
      });
  }

  getCityList(state: String) {
    this.cityList = [];
    this.selectedCity = '';

    const endPointCity = `/v2/cities?state=${state}&country=${this.selectedCountry}`;
    const url = `${this.domain}${endPointCity}${this.APIKey}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.cityList = response.data.map((item: any) => item.city);
      });
  }

  getWeatherInfo(city: String) {
    this.weatherDataService.showWeatherSelect(
      this.selectedCountry,
      this.selectedState,
      city
    );
  }

  ngOnInit(): void {
    const endPointCountry = '/v2/countries?';
    const url = `${this.domain}${endPointCountry}${this.APIKey}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.countryList = response.data.map((item: any) => item.country);
      });
  }
}
