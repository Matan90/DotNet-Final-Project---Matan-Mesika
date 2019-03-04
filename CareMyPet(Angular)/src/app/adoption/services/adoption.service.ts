import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApplicationService} from '../../services/application.service';

@Injectable()
export class AdoptionService {

  constructor(public http:HttpClient,
              public appService: ApplicationService) { }

  getAdoptions() : Observable<Adoption[]>{
  return this.http.get<Adoption[]>( `${this.appService.serverAddress}/api/Home/Adoption`);
  }

  getlastAdoptions() : Observable<Adoption>{
  return this.http.get<Adoption>(`${this.appService.serverAddress}/api/Home/LastAdoption`);
  }

}

export class Adoption{
  constructor(public adoptionID:number,
              public petName:string,
              public petRace:string,
              public petAge:string,
              public image:string,
              public location:string,
              public locationPhone:string) {
  }
}
