import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchLocationFormComponent } from './search-location-form/search-location-form.component';

import { LocationsListService} from './services/locations-list.service';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { CardsListingComponent } from './cards-listing/cards-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchLocationFormComponent,
    CardHolderComponent,
    CardsListingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LocationsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
