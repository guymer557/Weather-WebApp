import {Component, ViewChild} from '@angular/core';
import {CardsListingComponent} from './cards-listing/cards-listing.component';
import { LocationsListService } from './services/locations-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CardsListingComponent)
  private cardListing: CardsListingComponent;
  title = 'Weather WebApp';

  constructor(private locationListService: LocationsListService) {}

  onLocationChosen(locationObj) {
    if (!this.cardListing.isLocationExist(locationObj.name)) {
        this.locationListService.getCityWeatherInfo(locationObj.index);
    }
  }
}
