import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/entities/Project';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

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
  isDev:boolean = false;
  faEdit = faEdit;
  modalProjectId: number | undefined;

  constructor(private clientService: ClientService, 
              private projectService: ProjectService,
              private router: Router,
              private authService: AuthService){}

  ngOnInit() {    
    this.loadProjects();   
    this.isDev = this.authService.isAuthenticatedDev(); 
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
  updateComplete(projectId:number) {
    this.projectService.updateCompleted(projectId).subscribe((response) =>{
      console.log(response);
      this.loadProjects();  
    });
  }

  //updating project status to cancelled
  updateCancelled(projectId:number){
    this.projectService.updateCancelled(projectId).subscribe((response) => {
      console.log(response);
      this.loadProjects();
    });   
  }

  openCompleteModal(projectId: number) {
    this.modalProjectId = projectId;
    const modelDiv = document.getElementById('completeModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeCompleteModal() {
    const modelDiv = document.getElementById('completeModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }

  openCancelModal(projectId: number) {
    this.modalProjectId = projectId; 
    const modelDiv = document.getElementById('cancelModal');
    if (modelDiv != null){
      modelDiv.style.display = 'block';
    }   
  }

  closeCancelModal() {
    const modelDiv = document.getElementById('cancelModal');
    if (modelDiv != null){
      modelDiv.style.display = 'none';
    }   
  }

}
