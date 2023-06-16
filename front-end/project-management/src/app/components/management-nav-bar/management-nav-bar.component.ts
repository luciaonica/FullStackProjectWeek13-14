import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-management-nav-bar',
  templateUrl: './management-nav-bar.component.html',
  styleUrls: ['./management-nav-bar.component.css']
})
export class ManagementNavBarComponent {

  constructor(private authenticationService: AuthService, private router: Router){}

  logout(){
    this.authenticationService.deauthenticateClient();
    this.authenticationService.deauthenticateDev();
    localStorage.clear();
    this.router.navigate(['']);
  }
  currentUser(): string{
    return localStorage.getItem('currentUser') as string;
  }
  showDevTab(): boolean {
    return this.authenticationService.isAuthenticatedDev();
  }
}
