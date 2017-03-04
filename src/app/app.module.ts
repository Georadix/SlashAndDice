import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { MapComponent } from './map.component';
import { FogOfWarComponent } from './fog-of-war.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    OAuthModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    MapComponent,
    FogOfWarComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }