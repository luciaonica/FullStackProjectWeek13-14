import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-management-nav-bar',
  templateUrl: './management-nav-bar.component.html',
  styleUrls: ['./management-nav-bar.component.css']
})
export class ManagementNavBarComponent {

  constructor(private authenticationService: AuthService,
              private router: Router,
              private clientService: ClientService){}

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

  clientRegistered(): boolean{
    let clientId = parseInt(localStorage.getItem('clientId') || '0', 10);
    console.log(clientId);
    return false;
  
  }
}
