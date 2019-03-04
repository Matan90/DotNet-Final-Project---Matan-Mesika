import { LoginService } from './../../authentication/services/login.service';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../services/store.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ENTER_SELECTOR } from '@angular/animations/browser/src/util';

@Component({
  selector: 'stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})

export class StoresListComponent implements OnInit {
  //dataSource = ELEMENT_DATA;
  stores:MatTableDataSource<Store> = new MatTableDataSource<Store>(); 
  displayedColumns: string[] = ['storeName', 'description', 'activityTime', 'city', 'address', 'phone'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service:StoreService,
              public dialog: MatDialog,
              public loginService:LoginService,
              private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.stores.sort = this.sort;
    this.getStores();
  }

  getStores(){ 
    this.service.getStoreList().subscribe(result =>
    {
      this.stores.data = result;
    });
  }

  applyFilter(filterValue: string) {
    this.stores.filter = filterValue.trim().toLowerCase();
  }

  changeSource(){

  }

  openDialog(): void {
    let newStore:Store = {storeID:this.stores.data.length+1, storeName:"", description:"", activityTime:"", city:"", address:"", phone:""};
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: newStore
    });
    dialogRef.afterClosed().subscribe((result:Store) => {
      if (result){
        if (!result.storeName || !result.city || !result.address || !result.phone){
          this.snackBar.open("Store Name, City, Address or Phone are empty", "", {duration:3000});
          return;
        }
        if (result.storeName && result.city && result.address){
          let sutibleItem = this.stores.data.find(s => s.city === result.city && s.address === result.address && s.storeName === result.storeName);
          if (sutibleItem){
            this.snackBar.open("Store Name, City And Address already exists", "", {duration:3000});
            return;
          }
        }
        this.service.addNewStore(result.storeName, result.description, result.activityTime, result.city, result.address, result.phone).subscribe(result => {
          if (result){
            this.snackBar.open("Successfully Store Add !", "", {duration:3000});
          }
          else{
          this.snackBar.open("Store Name, City or Address already exists", "", {duration:3000});
          }
          return;
        });
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi</h1>
  <div mat-dialog-content>
    <p>Enter new store</p>
    <mat-form-field>
      <input matInput [(ngModel)]="data.storeName" placeholder="Enter Store Name">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.description" placeholder="Enter Description">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.activityTime" placeholder="Enter Activity Time">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.city" placeholder="Enter City">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.address" placeholder="Enter Address">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.phone" placeholder="Enter Phone">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button cdkFocusInitial (click)="onOkClick()">Ok</button>
  </div>`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Store) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick():void {

    this.dialogRef.close(this.data);
  }
}

export class Store {
  constructor(public storeID: number,
              public storeName: string,
              public description: string,
              public activityTime: string,
              public city: string,
              public address: string,
              public phone: string) {
  }
}

