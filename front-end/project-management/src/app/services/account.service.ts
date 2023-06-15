import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../entities/User';
import { Role } from '../entities/Role';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userApi = 'http://localhost:8081/api/users'
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http:HttpClient) { }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.userApi, user, this.httpOptions);
  }

  getAllUsers(): Observable<User[]> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('authKey') as string
    })
    return this.http.get<User[]>(this.userApi, this.httpOptions);
  }

  loginCheck(user: User): Observable<User> {
    const url = `${this.userApi}/login`;
    return this.http.post<User>(url,user, this.httpOptions);
  }
}
