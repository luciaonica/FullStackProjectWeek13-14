import { Component } from '@angular/core';
import { Client } from 'src/app/entities/Client';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dev-page',
  templateUrl: './dev-page.component.html',
  styleUrls: ['./dev-page.component.css']
})
export class DevPageComponent {

  clientName = "";
  clientId:number=0;
  
  clients: Client[] = [];  

  constructor(private clientService: ClientService, private projectService: ProjectService){}

  ngOnInit() {    
    //console.log("Length" + this.projects.length);
    this.loadClients();   
  }

  async loadClients() {

    this.clientService.clientList().subscribe((clients :any) => {
      this.clients = clients;
      console.log(clients.length);
    });  
        
  } 

  addProject(){
    
  }

}
