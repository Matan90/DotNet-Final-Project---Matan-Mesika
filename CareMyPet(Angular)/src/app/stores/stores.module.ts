import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresListComponent, DialogOverviewExampleDialog } from './stores-list/stores-list.component';
import {StoreService} from './services/store.service';
import {MatTableModule} from '@angular/material/table';
import {StoresMainComponent } from './stores-main/stores-main.component';
import { StoresHeaderComponent } from './stores-header/stores-header.component';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {storesRoutes} from './stores.routes';
import { MatDialogModule, MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild(storesRoutes)
  ],
  declarations: [
    StoresListComponent,
    StoresMainComponent,
    StoresHeaderComponent,
    DialogOverviewExampleDialog
  ],
  exports:[
    StoresListComponent,
    StoresMainComponent,
  ],
  entryComponents:[DialogOverviewExampleDialog],
  providers:[
    StoreService
  ]
})

export class StoresModule { }

