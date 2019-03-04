import { AdoptionService, Adoption } from './../../adoption/services/adoption.service';
import { HomeService } from './../services/home.service';
import { MatTableDataSource } from '@angular/material';
import { VsService, VS } from './../../vaterinary-services/services/vs.service';
import {Component, OnInit, ViewChild} from '@angular/core';
/// <reference types="googlemaps" />
// import {} from '@types/googlemaps';


@Component({
  selector: 'home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  vets:MatTableDataSource<VS> = new MatTableDataSource<VS>();
  homeContents:HomeContent[];
  lastAdoption:Adoption;

  constructor(private homeService:HomeService,
              private adoptionService:AdoptionService) { }

  displayedColumns: string[] = ['name', 'location', 'phone'];

  messages: string[];

  ngOnInit() {

    this.getVs();
    this.getHomeContentCards();
    this.getLastAdoption();
    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  getVs(){
    this.homeService.getVS().subscribe(result =>{
      this.vets.data = result;
    });
  }

  getHomeContentCards(){
    this.homeService.getHomeCardContents().subscribe(result =>{
      this.homeContents = result;
    });
  }

  getLastAdoption(){
    return this.adoptionService.getlastAdoptions().subscribe(result => {
      this.lastAdoption = result;
    });
  }
}

  export class Vet {
    constructor(public name: string,
              public location: string,
              public phone: string) {
    }
  }

  export class HomeContent {
    constructor(public contentCardID: number,
                public cardImage: string,
                public cardTitle: string,
                public cardDescription: string) {
    }
  }
