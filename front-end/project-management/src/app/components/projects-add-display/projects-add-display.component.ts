import { Component } from '@angular/core';
import { Project } from 'src/app/entities/Project';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-add-display',
  templateUrl: './projects-add-display.component.html',
  styleUrls: ['./projects-add-display.component.css']
})
export class ProjectsAddDisplayComponent {
  projectId:number|undefined;
  name!: string;
  clientId:number=0;
  username = localStorage.getItem('currentUser');

  constructor(private projectService: ProjectService, private clientService: ClientService){}

  onSubmit(){
    if(!this.name){
      alert('Please add a username!');
      return;
    } 

    this.clientService.getClientByUsername().subscribe((client: any) => {
      this.clientId = client.clientId;
      const newProject : Project = {
        name: this.name,
        startDate: new Date(),
        endDate: new Date(),
        status: "NEW",
        client: {'clientId': this.clientId,'name': "", address:"",email:"",username:"",agreement:"", registerDate:new Date()}
      }
      console.log(newProject);

      this.projectService.addProject(newProject).subscribe((result) =>{
        console.log(result);
      });
    });

    

    
  }


}
