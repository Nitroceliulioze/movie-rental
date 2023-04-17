import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, tap } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000/users';
  users: User[] = [];

  constructor(private http: HttpClient) {}

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap((newUser) => {
        this.users.push(newUser);
      })
    );;
  }
}
