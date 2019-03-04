import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdoptionMainComponent} from './adoption-main/adoption-main.component';
import { AdoptionHeaderComponent } from './adoption-header/adoption-header.component';
import {AdoptionService} from './services/adoption.service';
import {MatCardModule} from '@angular/material/card';
import { AdoptionListComponent } from './adoption-list/adoption-list.component';
import {RouterModule} from '@angular/router';
import {adoptionRoutes} from './adoption.routes';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(adoptionRoutes)
  ],
  declarations: [AdoptionMainComponent, AdoptionHeaderComponent, AdoptionListComponent],
  exports:[AdoptionMainComponent],
  providers:[AdoptionService]
})
export class AdoptionModule { }
