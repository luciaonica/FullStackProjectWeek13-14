import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/entities/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit{
  projectData: undefined | Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router){}

  ngOnInit(): void {
    let projectId = this.route.snapshot.paramMap.get('id');
    console.log(projectId);
    projectId && this.projectService.getProject(projectId).subscribe((data) =>{
      this.projectData = data;
    })
    
  }
  onSubmit(data:any){
    if (this.projectData){
      data.projectId = this.projectData.projectId;
      data.startDate = this.projectData.startDate;
      data.endDate = this.projectData.endDate;
      data.status = this.projectData.status;
      data.client = this.projectData.client;
    }
    this.projectService.updateProject(data).subscribe((result) =>{
      if (result) {
        console.log(result);
        alert('Updated project succesfully.');
        this.router.navigate(['projects']);
      }
    })
  }

}
