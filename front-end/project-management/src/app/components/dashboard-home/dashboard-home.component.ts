import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {

  constructor(private authService:AuthService){}

  showDevTab(){
    return this.authService.isAuthenticatedDev();
  }
}
