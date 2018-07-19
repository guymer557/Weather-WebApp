import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListingComponent } from './cards-listing.component';

describe('CardsListingComponent', () => {
  let component: CardsListingComponent;
  let fixture: ComponentFixture<CardsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
