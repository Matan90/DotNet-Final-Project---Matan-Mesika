import { VsService } from './services/vs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VaterinaryServicesHeaderComponent} from './vaterinary-services-header/vaterinary-services-header.component';
import {VaterinaryServicesListComponent} from './vaterinary-services-list/vaterinary-services-list.component';
import {VaterinaryServicesMainComponent} from './vaterinary-services-main.component';
import {VaterinaryServicesMapComponent} from './vaterinary-services-map/vaterinary-services-map.component';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {vsRoutes} from './vs.routes';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    AgmCoreModule,
    RouterModule.forChild(vsRoutes)
  ],
  declarations: [
    VaterinaryServicesHeaderComponent,
    VaterinaryServicesListComponent,
    VaterinaryServicesMainComponent,
    VaterinaryServicesMapComponent
  ],
  exports: [
    VaterinaryServicesHeaderComponent,
    VaterinaryServicesListComponent,
    VaterinaryServicesMainComponent,
    VaterinaryServicesMapComponent
  ],
  providers: [
    VsService,
    GoogleMapsAPIWrapper
  ]
})
export class VeterinaryServicesModule { }
