import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoresModule } from './stores/stores.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ApplicationService} from './services/application.service';
import {AboutComponent} from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdoptionModule} from './adoption/adoption.module';
import {HomeMainComponent} from './home/home-main/home-main.component';
import { HomeAboutComponent } from './home/home-about/home-about.component';
import {CarouselModule} from 'primeng/carousel';
import { HomeContentComponent } from './home/home-content/home-content.component';
import {MatTableModule} from '@angular/material/table';
import {VeterinaryServicesModule} from './vaterinary-services/veterinary-services.module';
import {ScrollDirective} from './scroll.directive';
import {HostelsModule} from './hostels/hostels.module';
import {RouterModule } from '@angular/router'
import {appRoutes} from './app-routes';
import {AgmCoreModule} from '@agm/core';
import { LoginComponent } from './authentication/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeMainComponent,
    HomeAboutComponent,
    HomeContentComponent,
    ScrollDirective,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StoresModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdoptionModule,
    CarouselModule,
    MatTableModule,
    VeterinaryServicesModule,
    HostelsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyBQzLmjSswsjk06A0OikGOZYuLhw7I1pyI'})
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBQzLmjSswsjk06A0OikGOZYuLhw7I1pyI'})
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
