import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  selectedCountry:any;
  selectedState:any;
  selectedCity:any;
  
  countryList = [];
  stateList = [];
  cityList = [];


  getStateList(country:String) {

   

    const domain = 'http://api.airvisual.com';
    const endPointState =`/v2/states?country=${country}`;
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointState}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      this.stateList = response.data.map((item: any) => item.state);
      // console.log(country);
      // console.log(this.stateList);
    });

    this.stateList=[];
    this.selectedState = '';
  }


  getCityList(state:String) {

    const domain = 'http://api.airvisual.com';
    const endPointCity = `/v2/cities?state=${state}&country=${this.selectedCountry}`;
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointCity}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.cityList = response.data.map((item: any) => item.city);
    });

    this.cityList=[];
    this.selectedCity = '';

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
