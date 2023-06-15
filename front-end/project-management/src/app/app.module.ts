import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { DevPageComponent } from './components/dev-page/dev-page.component';

const appRoutes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'create-account', component: CreateAccountComponent
  },
  {
    path: 'login', component: LoginComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateAccountComponent,
    LoginComponent,
    HomeNavbarComponent,
    DevPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
