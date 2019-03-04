import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import {VS} from '../services/vs.service';

@Component({
  selector: 'vaterinary-services-map',
  templateUrl: './vaterinary-services-map.component.html',
  styleUrls: ['./vaterinary-services-map.component.css']
})

export class VaterinaryServicesMapComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  _vs:VS[];

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      if (this.locationsNames){
        this.locationsNames.forEach(location=>{
          this.findLocation(location);
        });

        this.map.triggerResize();
      }
    });
  }

  geocoder:any;
  public location:Location = {
    lat: 31.7964453,
    lng: 35.2453989,
    marker: {
      lat: 31.7964453,
      lng: 35.2453989,
      draggable: true
    },
    zoom: 7
  };

  locationsNames:string[];
  locations:Location[] = [];

  @Input()
  set vs(val:VS[]){
      this._vs = val;
      this.locationsNames = val.map(v=> v.location);
      if (this.geocoder){
        this.locationsNames.forEach(location=>{
          this.findLocation(location);
        });

        this.map.triggerResize();
      }
  }

 @ViewChild(AgmMap) map: AgmMap;

  ngOnInit(): void {
    this.location.marker.draggable = true;
  }

  updateOnMap() {
    let full_address:string = this.location.address_level_1 || "";
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2;
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state;
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country;

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();


    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          let shopName:string;
          let sutibleItem = this._vs.find(v=> address === v.location);
          if (sutibleItem)
          {
             shopName = sutibleItem.name;
          }
          let newLocation:Location = {
            lat:results[0].geometry.location.lat(),
            lng:results[0].geometry.location.lng(),
            address_level_1:address,
            shopName: shopName
          };

          this.locations.push(newLocation);
        }


      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }
}

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom?: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
  shopName?:string;
}
