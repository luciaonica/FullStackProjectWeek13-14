import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/entities/Client';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-display',
  templateUrl: './update-display.component.html',
  styleUrls: ['./update-display.component.css']
})
export class UpdateDisplayComponent {
  clientId: number|undefined;
  name!: string;
  address!: string;
  email!: string;
  username = localStorage.getItem('currentUser')??'';
  
  
  fileToUpload: File | null = null;

  constructor(private http: HttpClient, private clientService: ClientService,
              private projectService: ProjectService, private router: Router) { }

  registerClient(){
    
    if(!this.name){
      alert('Please add a name!');
      return;
    } 
    if(!this.email){
      alert('Please add an email!');
      return;
    } 
    if(!this.address){
      alert('Please add an email!');
      return;
    } 
    if(confirm("Are you sure you want to submit this as your client info? ")){
      const newClient : Client = {
        name: this.name,
        address: this.address,
        registerDate: new Date(),      
        agreement:"",
        email: this.email,
        username: localStorage.getItem('currentUser') as string,
        numberOfProjects:0,
      }
  
      this.clientService.registerClient(newClient).subscribe((client: any) => {
        localStorage.setItem('clientId', client.clientId);
        this.projectService.updateClientIdLocal();
        this.uploadPdf(client.clientId);
        this.router.navigate(['projects'])
      })
    }
  }

  uploadPdf(clientId:number) {
    if (!this.fileToUpload) {
      alert('No file selected.');
      return;
    }
    

   this.clientService.uploadPdf(clientId, this.fileToUpload).subscribe(
    response => {
      // Handle success response
      console.log('Registration success:', response);
    },
    error => {
      // Handle error response
      console.error('Registration error:', error);
    }
   );

  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

}
