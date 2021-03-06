import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import {LocationsListService} from '../services/locations-list.service';

@Component({
  selector: 'app-search-location-form',
  templateUrl: './search-location-form.component.html',
  styleUrls: ['./search-location-form.component.css']
})
export class SearchLocationFormComponent implements OnInit {

  @ViewChild('inputLocationForm') inputLocationForm: NgForm;
  @ViewChild('chooseLocationForm') chooseLocationForm: NgForm;
  @Output() locationChosen = new EventEmitter<object>();
  locationsList: Array<string>;
  isLocationChosen: boolean = false;
  isNoLocationsFound: boolean;


  constructor(private locationListService: LocationsListService) { }

  ngOnInit() {
  }

  onLocationSubmit(location): void {
    this.locationListService.getLocationsOptions(location).subscribe(
      (data: Array<string>) => {this.isNoLocationsFound = false;
                                      if(data.length > 0){
                                        this.locationsList = data;
                                        this.isLocationChosen = true;
                                      }
                                      else{
                                         this.isNoLocationsFound = true;
                                          }
                                    }
    );
  }

  onChooseSubmit(city): void {
    this.locationChosen.emit(city);
    this.inputLocationForm.reset();
    this.chooseLocationForm.reset();
    this.isLocationChosen = false;
  }



}
