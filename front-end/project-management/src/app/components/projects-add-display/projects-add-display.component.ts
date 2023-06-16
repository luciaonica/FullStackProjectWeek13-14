import { Component } from '@angular/core';
import { Project } from 'src/app/entities/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-add-display',
  templateUrl: './projects-add-display.component.html',
  styleUrls: ['./projects-add-display.component.css']
})
export class ProjectsAddDisplayComponent {
  projectId:number|undefined;
  name!: string;
  clientId = parseInt(localStorage.getItem('clientId') || '0', 10);

  constructor(private projectService: ProjectService){}

  onSubmit(){
    if(!this.name){
      alert('Please add a username!');
      return;
    } 
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
  }


}
