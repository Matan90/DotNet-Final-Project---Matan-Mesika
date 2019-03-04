import { Component, OnInit } from '@angular/core';
import {Adoption, AdoptionService} from '../services/adoption.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {

  constructor(private service:AdoptionService) { }
  adoptions:Adoption[];

  ngOnInit() {
    this.getAdoptions();
  }

  getAdoptions(){
    this.service.getAdoptions().subscribe(result =>
    {
      this.adoptions = result;
    });
  }

}
