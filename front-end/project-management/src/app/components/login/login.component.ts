import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { Role } from 'src/app/entities/Role';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  user!: User;

  constructor(private accountService: AccountService, 
              private router: Router){

  }

  ngOnInit(): void{
    localStorage.setItem('currentUser', '');
  }

  async onSubmit(){
    this.user = {
      username: this.username,
      password: this.password,
      enabled: true,
      roles: []
    };
    localStorage.setItem('authKey', 'Basic ' + btoa(`${this.user.username}:${this.user.password}`));
    //add localstorage.clear when user press logout
    localStorage.setItem('currentUser', this.user.username);
    this.accountService.loginCheck(this.user).subscribe((user) => {
      this.user = user;
    })
  }
}
