import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedClient: boolean = false;
  private authenticatedDev: boolean = false;

  constructor() { }

  isAuthenticatedClient(): boolean {
    return this.authenticatedClient;
  }
  isAuthenticatedDev(): boolean {
    return this.authenticatedDev;
  }

  authenticateDev(): void {
    this.authenticatedDev = true;
  }
  authenticateClient(): void {
    this.authenticatedClient = true;
  }
  deauthenticateDev(): void {
    this.authenticatedDev = false;
  }
  deauthenticateClient(): void {
    this.authenticatedClient = false;
  }
}
