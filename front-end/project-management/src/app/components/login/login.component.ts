import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/entities/User';
import { Role } from 'src/app/entities/Role';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
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
              private authenticationService: AuthService,
              private clientService: ClientService, 
              private projectService: ProjectService,
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
      let isDev:boolean = false;
      if(this.user.enabled == false) {
        alert("Account not enabled or details are wrong, please try again.")
      } else {
        this.user.roles.forEach((role: Role) => {
          if(role.name === 'ROLE_DEVELOPER'){
            isDev = true;
          }
        })
        if(isDev){
          this.authenticationService.authenticateDev();
          this.authenticationService.authenticateClient();
          this.clientService.updateUsername();
          this.clientService.getClientByUsername().subscribe((client) => {
            if(client == null){
              localStorage.setItem('clientId', '0');
              this.projectService.updateClientIdLocal();
              this.router.navigate(['/dashboard']);
            } else {
              localStorage.setItem('clientId', '' + client.clientId);
              this.projectService.updateClientIdLocal();
              this.router.navigate(['/dashboard']);
            }
          })
        } else {
          this.clientService.updateUsername();
          this.authenticationService.authenticateClient();
          this.clientService.getClientByUsername().subscribe((client) => {
            if(client == null){
              localStorage.setItem('clientId', '0');
              this.projectService.updateClientIdLocal();
              this.router.navigate(['/dashboard']);
            } else {
              localStorage.setItem('clientId', '' + client.clientId);
              this.projectService.updateClientIdLocal();
              this.router.navigate(['/dashboard']);
            }
          }
          )
        } 
      }
    })
  }
}
