import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ManagementNavBarComponent } from './components/management-nav-bar/management-nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { DevPageComponent } from './components/dev-page/dev-page.component';
import { ClientGuard } from './guard/client-guard';
import { DevGuard } from './guard/dev-guard';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ProjectsDisplayComponent } from './components/projects-display/projects-display.component';
import { ProjectsAddDisplayComponent } from './components/projects-add-display/projects-add-display.component';
import { UpdateDisplayComponent } from './components/update-display/update-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { LicensingComponent } from './components/licensing/licensing.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { ViewClientInfoComponent } from './components/view-client-info/view-client-info.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';

const appRoutes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'licensing', component: LicensingComponent
  },
  {
    path: 'create-account', component: CreateAccountComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'create-client', component: UpdateDisplayComponent,
    canActivate: [ClientGuard]
  },
  {
     path:'dashboard', component: DashboardHomeComponent,
     canActivate: [ClientGuard]
  },
  {
     path: 'projects', component: ProjectsDisplayComponent,
     canActivate: [ClientGuard]
  },
  {
    path: 'projects/add', component: ProjectsAddDisplayComponent,
    canActivate: [ClientGuard]
  },
  {
    path:'dev', component:DevPageComponent,
    canActivate: [DevGuard]
  },
  {
    path: 'projects/add/:clientId', component: ProjectsAddDisplayComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'projects/update/:id', component: UpdateProjectComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'clients/view/:id', component: ViewClientInfoComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'account/update', component: UpdateAccountComponent,
    canActivate: [ClientGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateAccountComponent,
    LoginComponent,
    LicensingComponent,
    HomeNavbarComponent,
    ManagementNavBarComponent,
    DevPageComponent,
    DashboardHomeComponent,
    ProjectsAddDisplayComponent,
    ProjectsDisplayComponent,
    UpdateDisplayComponent,
    FooterComponent,
    LicensingComponent,
    UpdateProjectComponent,
    ViewClientInfoComponent,
    UpdateAccountComponent
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
