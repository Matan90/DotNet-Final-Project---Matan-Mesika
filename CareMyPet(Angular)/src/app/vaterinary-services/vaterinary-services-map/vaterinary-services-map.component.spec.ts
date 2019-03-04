import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaterinaryServicesMapComponent } from './vaterinary-services-map.component';

describe('VaterinaryServicesMapComponent', () => {
  let component: VaterinaryServicesMapComponent;
  let fixture: ComponentFixture<VaterinaryServicesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaterinaryServicesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaterinaryServicesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
