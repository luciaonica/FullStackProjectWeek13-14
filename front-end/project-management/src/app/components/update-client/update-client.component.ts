import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/entities/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit{
  client: Client = {} as Client;
  fileToUpload: File | null = null;
  selectedFileName?: string | null;

  constructor(private route: ActivatedRoute, 
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit(): void {
    let clientId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
     this.clientService.getClientById(clientId).subscribe(
      (client: Client) => {
        this.client = client;
        this.selectedFileName=this.client.agreement;
      },
      (error: any) => {
        console.error('Error retrieving client:', error);
      }
    );
    
  }

 

  async updateClient() {
    // Add any necessary validation for the form fields
    //this.client.agreement='';
    if(confirm("Are you sure you want to update the client info?")){
      this.clientService.updateClient(this.client).subscribe(
        (response: any) => {
          // Handle success response
          console.log('Update success:', response);
          // Perform any additional actions (e.g., show success message, redirect)
        },
        (error: any) => {
          // Handle error response
          console.error('Update error:', error);
          // Perform any additional error handling (e.g., show error message)
        }
      );
      this.client.clientId && this.uploadPdf(this.client.clientId);
      alert("Client information updated!");
      this.router.navigate(['dev']);
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
    this.selectedFileName = this.fileToUpload ? this.fileToUpload.name : this.selectedFileName;
  }
}