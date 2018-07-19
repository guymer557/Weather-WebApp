import { TestBed, inject } from '@angular/core/testing';

import { LocationsListService } from './locations-list.service';

describe('LocationsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsListService]
    });
  });

  it('should be created', inject([LocationsListService], (service: LocationsListService) => {
    expect(service).toBeTruthy();
  }));
});
