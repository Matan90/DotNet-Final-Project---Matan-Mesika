import {Routes} from '@angular/router';
import {HomeMainComponent} from './home/home-main/home-main.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './authentication/login/login.component';

export const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: 'home',  component: HomeMainComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'about',  component: AboutComponent},
  { path: 'login',  component: LoginComponent},
  // { path: '**', component: PageNotFoundComponent }
];
