import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../entities/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8081'
  
  clientId = parseInt(localStorage.getItem('clientId') || '0', 10);

  constructor(private http: HttpClient) { }

  projectList(clientId: number) {
    return this.http.get<Project[]>(`${this.apiUrl}/admin/clients/projects/${clientId}`);
  }

  updateCompleted(projectId:number){
    alert(projectId);
    return this.http.get(`${this.apiUrl}/admin/projects/${projectId}/update_status/COMPLETED`, { responseType: 'text' });
  }

  updateCancelled(projectId:number){
    console.log(projectId);
    return this.http.get(`${this.apiUrl}/admin/projects/${projectId}/update_status/CANCELLED`, { responseType: 'text' });
  }

  addProject(newProject:Project){
    newProject.client
    return this.http.post(`${this.apiUrl}/admin/projects`, newProject);    
  }

  updateClientIdLocal(){
    this.clientId = parseInt(localStorage.getItem('clientId') || '0', 10);
  }

  getProject(id:string) {
    return this.http.get<Project>(`${this.apiUrl}/admin/projects/${id}`);
  }

  updateProject(project: Project) {
    return this.http.put(`${this.apiUrl}/admin/projects`, project);
  }
}
