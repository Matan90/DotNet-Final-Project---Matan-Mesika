import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '../stores-list/stores-list.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ApplicationService} from '../../services/application.service';

@Injectable()
export class StoreService {

  constructor(private http:HttpClient,
              private appService: ApplicationService) { }


  getStoreList() : Observable<Store[]>{
    //return this.http.get<Store[]>( `${this.appService.serverAddress}/api/values/`);
    return this.http.get<Store[]>( `${this.appService.serverAddress}/api/Home/Stores`);
  }

  addNewStore(storeName:string, description:string, activityTime:string, city:string, address:string, phone:string): Observable<boolean>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("storeName", storeName);
    httpParams = httpParams.append("description", description);
    httpParams = httpParams.append("activityTime", activityTime);
    httpParams = httpParams.append("city", city);
    httpParams = httpParams.append("address", address);
    httpParams = httpParams.append("phone", phone);
    return this.http.get<boolean>(`${this.appService.serverAddress}/api/Home/AddStore`, {params: httpParams , responseType:"json"})
  }
}
