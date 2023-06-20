import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  currentPassword!: string;
  confirmCurrentPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
  user!: User;

  constructor(private accountService: AccountService,private authService: AuthService, private router: Router){}

  async onSubmit(){
    if(this.currentPassword !== this.confirmCurrentPassword){
      alert("Current password and confirmation do not match. Please try again.")
      return;
    }
    if(this.newPassword !== this.confirmNewPassword){
      alert('New password and confirmation do not match. Please try again.');
      return;
    } 
    if(!this.currentPassword){
      alert('Please insert the current password.');
      return;
    } 
    if(!this.confirmCurrentPassword){
      alert('Please insert the confirmation for the current password.');
      return;
    } 
    if(!this.newPassword){
      alert('Please insert the new password.');
      return;
    } 
    if(!this.confirmNewPassword){
      alert('Please insert the confirmation for the new password.');
      return;
    } 
    this.user = {
      username: localStorage.getItem('currentUser') as string,
      password: this.currentPassword,
      enabled: true,
      roles: []
    };
    this.accountService.loginCheck(this.user).subscribe((user) => {
      if(user.enabled == false) {
        alert("Current password is incorrect. Please try again.")
      } else {
        let userToUpdate: User = {
          username: user.username,
          password: this.newPassword,
          enabled: user.enabled,
          roles: user.roles
        }
        this.accountService.updateUser(userToUpdate).subscribe((user2) => 
        {
          this.user = user2;
          alert("Password succesfully updated");
          localStorage.clear();
          //localStorage.setItem('authKey', 'Basic ' + btoa(`${user.username}:${this.newPassword}`));
          this.currentPassword = '';
          this.confirmCurrentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
          this.authService.deauthenticateClient();
          this.authService.deauthenticateDev();
          this.router.navigate(['login']);
          
        })
    }
  })
  }
}
