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

    const domain = 'http://api.airvisual.com';
    const endPointState = `/v2/states?country=${country}`;
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointState}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      this.stateList = response.data.map((item: any) => item.state);
    });

   
  }

  getCityList(state: String) {
    this.cityList = [];
    this.selectedCity = '';

    const domain = 'http://api.airvisual.com';
    const endPointCity = `/v2/cities?state=${state}&country=${this.selectedCountry}`;
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointCity}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.cityList = response.data.map((item: any) => item.city);
    });
  }

  getWeatherInfo(city: String) {
    this.weatherDataService.showWeatherSelect(this.selectedCountry,this.selectedState,city);
  }

  ngOnInit(): void {
    const domain = 'http://api.airvisual.com';
    const endPointCountry = '/v2/countries?';
    const APIKey = 'key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointCountry}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      this.countryList = response.data.map((item: any) => item.country);
    });
  }
}
