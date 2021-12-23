import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor( private http: HttpClient,) { }

  selectedCountry = null;

  countryList = [];

  ngOnInit(): void {
    const domain = 'http://api.airvisual.com';
    const endPointCities = '/v2/cities?state=California&country=USA';
    const APIKey = '&key=85b08754-d67d-492f-ab21-e4fc4718756b';
    const url = `${domain}${endPointCities}${APIKey}`;
    this.http.get(url).subscribe((response: any) => {
      this.countryList = response.data.map((item: any) => item.city);
    });
  }

}
