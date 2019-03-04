import { Component, OnInit } from '@angular/core';
import {VS, VsService} from './services/vs.service';

@Component({
  selector: 'vaterinary-services-main',
  templateUrl: './vaterinary-services-main.component.html',
  styleUrls: ['./vaterinary-services-main.component.scss']
})
export class VaterinaryServicesMainComponent implements OnInit {

  constructor(private service:VsService) { }

  vs:VS[];

  ngOnInit() {
    this.getVs();
  }

  getVs() {
    this.service.getVsList().subscribe(result =>
    {
      this.vs = result;
    });
  }
}
