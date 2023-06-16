import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../entities/Project';
import { Observable } from 'rxjs';
import { Client } from '../entities/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8081'
  clientName = "";
  clientId:number=0;
  username = "lucia"; 
  projects: Project[] = [];

  constructor(private http: HttpClient) { }  

  getClientByUsername(){
    console.log("service called");
    return this.http.get<Client>(`${this.apiUrl}/admin/clients/client_by_username/${this.username}`);
  }

  registerClient(newClient: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/clients`, newClient);
  }

  uploadPdf(clientId: number, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`http://localhost:8081/admin/clients/upload/${clientId}`, formData, {
      responseType: 'text'
    });
  }
}
