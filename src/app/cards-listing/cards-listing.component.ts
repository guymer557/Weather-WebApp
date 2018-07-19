import { Component, OnInit } from '@angular/core';

import { LocationsListService } from '../services/locations-list.service';

import { WeatherInfo } from '../weather-info';

@Component({
  selector: 'app-cards-listing',
  templateUrl: './cards-listing.component.html',
  styleUrls: ['./cards-listing.component.css']
})
export class CardsListingComponent implements OnInit {

  cards: Array<WeatherInfo> = [];

  constructor(private locationsListService: LocationsListService) { }

  ngOnInit() {
    this.locationsListService.newCardSubject.subscribe(
      data => this.addNewCard(data)
    );
  }

  addNewCard(data): void {
    if (this.cards.length === 3) {
      this.cards.splice(0, 1);
    }

    this.cards.push(data);
  }

}
