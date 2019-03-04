import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from './../../services/application.service';

@Injectable()
export class VsService {

  constructor(private http:HttpClient,
              private appService:ApplicationService) { }

  getVsList(): Observable<VS[]>{
    return this.http.get<VS[]>(`${this.appService.serverAddress}/api/Home/VS`);
  }
}

export class VS {
  constructor(public vsID?: number,
              public name?: string,
              public description?: string,
              public animalsTypes?: string,
              public location?: string,
              public phone?: string,
              public activityTime?: string) {
  }
}
