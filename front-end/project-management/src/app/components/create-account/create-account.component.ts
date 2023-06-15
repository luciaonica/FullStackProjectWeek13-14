import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  username!: string;
  password!: string;
  userCreated!: User;
  constructor(private accountService: AccountService){}

  ngOnInit(): void{
    //TODO: change authentication flags if needed
  }

  onSubmit(){
    if(!this.username){
      alert('Please add a username!');
      return;
    } if (!this.password){
      alert('Please add a password!');
      return;
    }
    const newUser : User = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: [{'id':2,'name': "ROLE_CLIENT"}] 
    }
    this.accountService.addUser(newUser).subscribe((user: User) => (this.userCreated = user));
    alert('Account succesfully created. Please use the login tab for logging into the application. If it does not work please try registering a different username.');
    this.username = '';
    this.password = '';
  }
}
