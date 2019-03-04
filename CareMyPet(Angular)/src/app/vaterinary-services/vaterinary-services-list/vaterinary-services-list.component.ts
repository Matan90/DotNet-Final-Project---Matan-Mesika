import { VsService, VS } from './../services/vs.service';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'vaterinary-services-list',
  templateUrl: './vaterinary-services-list.component.html',
  styleUrls: ['./vaterinary-services-list.component.css']
})
export class VaterinaryServicesListComponent implements OnInit {

  constructor() { }

  vsSource:MatTableDataSource<VS> = new MatTableDataSource<VS>();
  displayedColumns: string[] = [ 'name' , 'description' , 'animalsTypes' , 'location' , 'phone' , 'activityTime' ];

  @ViewChild(MatSort) sort: MatSort;

  @Input()
  set vs(val:VS[]){
    this.vsSource.data = val;
  }

  ngOnInit(){
    this.vsSource.sort = this.sort;
  }



  applyFilter(filterValue: string) {
    this.vsSource.filter = filterValue.trim().toLowerCase();
  }

}
