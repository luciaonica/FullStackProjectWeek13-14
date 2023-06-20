import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { Role } from 'src/app/entities/Role';
@Component({
  selector: 'app-create-dev',
  templateUrl: './create-dev.component.html',
  styleUrls: ['./create-dev.component.css']
})
export class CreateDevComponent {
  username!: string;
  password!: string;
  confirmPassword!: string;
  devCreated!: User;

  constructor(private accountService: AccountService){}

  onSubmit(){
    if(this.password !== this.confirmPassword){
      alert("Passwords do not match. Please try again.")
      return;
    }
    if(!this.username){
      alert('Please add a username!');
      return;
    } 
    if (!this.password){
      alert('Please add a password!');
      return;
    }
    if (!this.confirmPassword){
      alert('Please add a confirmation password!');
      return;
    }
    const newDev : User = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: [{'id':1,'name': "ROLE_DEVELOPER"},{'id':2,'name': "ROLE_CLIENT"}] 
    }
    this.accountService.addDev(newDev).subscribe((user: User) => (this.devCreated = user));
    alert('Developer account succesfully created. Please use the login tab for logging with this developer. If it does not work please try registering a different username.');
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
