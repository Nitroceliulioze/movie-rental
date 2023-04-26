import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TrackError } from '../trackError';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000/users';
  users: User[] = [];
 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[] | TrackError> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(err => this.handleHttpError(err))
    )
  }

  private handleHttpError(error: HttpErrorResponse): Observable<TrackError> {
    let dataError = new TrackError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError)
  }


  getUser(id: number): Observable<User> {    
    return this.http.get<User>(`${this.apiUrl}/${id}`, {      
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    })
    // .pipe(
    //   map(u => <User> {
    //     id: u.id,
    //     firstName: u.firstName,
    //     surname: u.surname,
    //     email: u.email,
    //     confirmEmail: u.confirmEmail,
    //     password: u.password,
    //     confirmPassword: u.confirmPassword
    //   }),
    //   tap(user => console.log(user))
    // );
  }

  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap((newUser) => {
        this.users.push(newUser);
      })
    );;
  }
}
