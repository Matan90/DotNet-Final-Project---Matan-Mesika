import { HostelsService, Hostel } from './../services/hostels.service';
import { VsService } from './../../vaterinary-services/services/vs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hostels-main',
  templateUrl: './hostels-main.component.html',
  styleUrls: ['./hostels-main.component.scss']
})
export class HostelsMainComponent implements OnInit {

  hostels:Hostel[];

  constructor(private service:HostelsService) { }

  ngOnInit() {
    this.getHostels();
    // let hostel1:Hostel = new Hostel("myHostel", "tel-aviv", "054-7503545", "Dog, Cat, Tiger", "");
    // let hostel2:Hostel = new Hostel("myHostel2", "tel-aviv", "054-5673545", "Dog, Cat, Caw", "");
    // this.hostels = [hostel1, hostel2];
  }


  getHostels(){
    return this.service.getHostelsList().subscribe(result => {
      this.hostels = result;
    });
  }
}

