import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HostelsMainComponent } from './hostels-main/hostels-main.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {hostelsRoutes} from './hostels.routes';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(hostelsRoutes)
  ],
  declarations:
    [
  HostelsMainComponent
  ],
  exports:[
    HostelsMainComponent
  ],
  providers:[

  ]
})

export class HostelsModule { }

