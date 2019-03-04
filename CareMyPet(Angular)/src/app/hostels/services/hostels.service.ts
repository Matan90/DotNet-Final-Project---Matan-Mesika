import { ApplicationService } from './../../services/application.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelsService {

  constructor(private http:HttpClient,
              private appService:ApplicationService) { }
  
  getHostelsList() : Observable<Hostel[]>{
    return this.http.get<Hostel[]>(`${this.appService.serverAddress}/api/Home/Hostels`);
  }
}

export class Hostel{
  constructor(public hostelID:number,
              public hostelImage:string,
              public hostelName:string,
              public animalsTypes:string,
              public location:string,
              public phone:string) {}
}
