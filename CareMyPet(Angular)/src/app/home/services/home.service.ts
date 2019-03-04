import { VS } from './../../vaterinary-services/services/vs.service';
import { HomeContentComponent, HomeContent } from './../home-content/home-content.component';
import { ApplicationService } from './../../services/application.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:HttpClient,
              private appService: ApplicationService) { }


  getHomeCardContents() : Observable<HomeContent[]>{
  return this.http.get<HomeContent[]>(`${this.appService.serverAddress}/api/Home/HomeContents`);
  }

  getVS(){
    return this.http.get<VS[]>(`${this.appService.serverAddress}/api/Home/VS`);
  }

}
