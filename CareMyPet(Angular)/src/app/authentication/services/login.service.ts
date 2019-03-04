import { ApplicationService } from './../../services/application.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IUser} from '../../../common/user.model';
import { Observable } from 'rxjs';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // public loggedInUser:IUser = {privateName:"Matan", familyName:"Mesika"};

  public loggedInUser:IUser;

  constructor(private http:HttpClient,
              private appService:ApplicationService) { }

  loginRequest(userName:string,password:string): Observable<string>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("userName", userName);
    httpParams = httpParams.append("password", password);
    return this.http.get(`${this.appService.serverAddress}/api/Home/Login`, {params: httpParams , responseType:"text"});
  }

  //return from server for this hash the relevant user name
  checkLogin(loginHash:string): Observable<string>{
    let httpParams = new HttpParams();
    let encodedLoginHash = encodeURIComponent(loginHash);
    httpParams = httpParams.append("hash", encodedLoginHash);
    return this.http.get(`${this.appService.serverAddress}/api/Home/LocalStorageLogin`, {params: httpParams , responseType:'text'});
  }

  get isUserLoggedIn():boolean{
    return this.loggedInUser != null;
  }

  register(firstname:string, lastname:string, userName:string, password:string): Observable<boolean>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("firstname", firstname);
    httpParams = httpParams.append("lastname", lastname);
    httpParams = httpParams.append("userName", userName);
    httpParams = httpParams.append("password", password);
    return this.http.get<boolean>(`${this.appService.serverAddress}/api/Home/Register`, {params: httpParams , responseType:"json"});
  }

  public storeUser(userName:string, hash:string){
    localStorage.setItem(userName, hash);
  }

  public getHashForUser():string{
    if (localStorage.length > 0){
      let key = localStorage.key(0);
      return localStorage.getItem(key);
    }
    return null;
  }
}


