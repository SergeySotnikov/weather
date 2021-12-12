import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  cityList = [];
  choiceCity: any;
  temperatureCelsius:any;
  atmosphericPressure:any;
  humidity:any;
  windSpeed:any;
  
  constructor(private http: HttpClient) {}

  showWeather(event: any) {
    this.choiceCity = event.target.textContent;
    console.log(this.choiceCity);
    this.http
    .get(
      `http://api.airvisual.com/v2/city?city=${this.choiceCity}&state=California&country=USA&key=85b08754-d67d-492f-ab21-e4fc4718756b`
    )
    .subscribe((response: any) => {
      console.log(response);
      this.temperatureCelsius= response.data.current.weather.tp;
      this.atmosphericPressure=response.data.current.weather.pr;
      this.humidity=response.data.current.weather.hu;
      this.windSpeed=response.data.current.weather.ws;
    });
  }

  ngOnInit() {
    this.http
      .get(
        'http://api.airvisual.com/v2/cities?state=California&country=USA&key=85b08754-d67d-492f-ab21-e4fc4718756b'
      )
      .subscribe((response: any) => {
        this.cityList = response.data.map((item: any) => item.city);
        /* console.log(this.cityList); */
      });
  }
}
