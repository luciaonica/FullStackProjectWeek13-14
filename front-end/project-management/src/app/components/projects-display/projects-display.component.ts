import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/entities/Project';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css']
})
export class ProjectsDisplayComponent implements OnInit{
  clientName = "";
  clientId:number=0;
  //username = "kjk";
  username = localStorage.getItem('currentUser');
  projects: Project[] = []; 

  constructor(private clientService: ClientService, private projectService: ProjectService){}

  ngOnInit() {    
    this.loadProjects();   
  }

  async loadProjects() {

    this.clientService.getClientByUsername().subscribe((client: any) => {
      this.clientId = client.clientId;
      this.clientName = client.name;
      console.log(client);
      //localStorage.removeItem('clientId');
      //localStorage.setItem('clientId', this.clientId.toString())
      this.projectService.projectList(this.clientId).subscribe((projects) => this.projects = projects);    
    });
        
  } 

  //updating project status to completed
  updateCompleted(projectId:number){
    alert(projectId);
    this.projectService.updateCompleted(projectId).subscribe((response) =>{
      console.log(response);
      this.loadProjects();  
    });
        
  }

  //updating project status to cancelled
  updateCancelled(projectId:number){
    console.log(projectId);
    this.projectService.updateCancelled(projectId).subscribe((response) => {
      console.log(response);
      this.loadProjects();
    });   
  }

}
