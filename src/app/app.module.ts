import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { ButtonComponent } from './shared/button/button.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { YourMoviesComponent } from './components/your-movies/your-movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { YourMovieItemComponent } from './components/your-movie-item/your-movie-item.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    ButtonComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    YourMoviesComponent,
    ProfileComponent,
    MovieItemComponent,
    YourMovieItemComponent
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
