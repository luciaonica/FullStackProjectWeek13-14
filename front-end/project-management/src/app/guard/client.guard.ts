import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard {
  constructor(private authenticationService: AuthService, private router: Router){};

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): boolean {
    if(!this.authenticationService.isAuthenticatedClient()){
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
}