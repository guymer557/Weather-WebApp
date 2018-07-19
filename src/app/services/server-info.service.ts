import { Injectable } from '@angular/core';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoService {

  // baseUrl: string = 'http://localhost:8080';
  locationRoute: string = '/location';
  locationParamName: string = 'location';
  cityRoute: string = '/city';
  cityParamName: string = 'index';

  constructor() { }

  getLocationUrl(param) {
    return {url: this.locationRoute,
            options:{
                     params: new HttpParams().set(this.locationParamName, param),
                     withCredentials:true
                    }
           };
  }

  getCityUrl(param) {
    return {url: this.cityRoute,
            options:{
                     params: new HttpParams().set(this.cityParamName, param),
                     withCredentials:true
           }
    };
  }
}
