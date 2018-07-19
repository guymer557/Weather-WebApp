import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ServerInfoService } from './server-info.service';

@Injectable({
   providedIn: 'root'
})
export class LocationsListService {
  public newCardSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient, private serverInfo: ServerInfoService) { }

  getLocationsOptions(locationName) {
    const requestInfo = this.serverInfo.getLocationUrl(locationName);
    return this.http.get(requestInfo.url, requestInfo.options);
  }

  getCityWeatherInfo(cityIndex) {
    const requestInfo = this.serverInfo.getCityUrl(cityIndex);
    this.http.get(requestInfo.url, requestInfo.options).subscribe(
      data => this.newCardSubject.next(data)
    );
  }
}
