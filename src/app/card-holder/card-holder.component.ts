import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from '../weather-info';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})
export class CardHolderComponent implements OnInit {

  @Input('card') card: WeatherInfo;

  constructor() { }

  ngOnInit() {
  }

}
