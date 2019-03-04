import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './authentication/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  selectedItem:string;

  constructor(private router: Router,
              public loginService:LoginService) {
  }

  onHomeClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/home']);
  }

  onStoresClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/stores']);
  }

  onAdoptionClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/adoption']);
  }

  onVsClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/vs']);
  }

  onAboutClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/about']);
  }

  onAnimalHostelsClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/hostels']);
  }

  onLoginClicked(value:string){
    this.selectedItem = value;
    this.router.navigate(['/login']);
  }

  onLogout(){
    this.loginService.loggedInUser = null;
    localStorage.clear();
  }

  ngOnInit(){
    let hash = this.loginService.getHashForUser();
    if (hash){
      this.loginService.checkLogin(hash).subscribe(res=>{
        if (res === "") return;
        this.loginService.loggedInUser = {userName:res};
      });
    }
  }
}
