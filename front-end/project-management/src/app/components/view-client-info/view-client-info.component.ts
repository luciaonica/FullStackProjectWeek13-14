import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/entities/Client';
import { Project } from 'src/app/entities/Project';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-client-info',
  templateUrl: './view-client-info.component.html',
  styleUrls: ['./view-client-info.component.css']
})
export class ViewClientInfoComponent implements OnInit{
  projects: Project[] = [];
  clientId:number=0;
  client!: Client;

  constructor(private clientService: ClientService, 
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient){}

  ngOnInit() {
    this.clientId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.clientService.getClientById(this.clientId).subscribe((client) => this.client = client);
    this.projectService.projectList(this.clientId).subscribe((projects) => this.projects = projects);    
  }

  //updating project status to completed
  updateCompleted(projectId:number){
    this.projectService.updateCompleted(projectId).subscribe((response) =>{
      console.log(response);
      alert('Project status updated! An email was sent to you!');
      //refresh the page
      this.projectService.projectList(this.clientId).subscribe((projects) => this.projects = projects);    
    });    
  }

  //updating project status to cancelled
  updateCancelled(projectId:number){
    this.projectService.updateCancelled(projectId).subscribe((response) => {
      console.log(response);
      alert('Project status updated! An email was sent to you!');
      //refresh the page
      this.projectService.projectList(this.clientId).subscribe((projects) => this.projects = projects);    
    });   
  }

  downloadFile(filename: string): void {
    this.clientService.download(this.clientId + "/" + filename)
    .subscribe(blob => saveAs(blob, filename));
    console.log("metho download is called " + this.clientId + "/" + filename)
  }
}
