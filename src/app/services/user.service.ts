import { Injectable, Input } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { User } from '../user';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
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
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<TrackError> {
    let dataError = new TrackError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User>(`${this.apiUrl}`, { params });
  }

  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap((newUser) => {
        this.users.push(newUser);
      })
    );
  }

  updateUserByEmail(email: string, updatedUser: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('email', email);
    console.log(this.users);
    return this.http.get<User[]>(`${this.apiUrl}`, { params }).pipe(
      switchMap((users) => {
        const existingUser = users.find((user) => user.email === email);
        if (!existingUser) {
          return throwError(`User with email ${email} not found.`);
        }
        const mergedUser = { ...existingUser, ...updatedUser };
        mergedUser.confirmEmail = existingUser.email;
        mergedUser.confirmPassword = updatedUser.password;
        const url = `${this.apiUrl}/${existingUser.id}`;
        return this.http.put<User>(url, mergedUser, { headers }).pipe(
          tap(() => {
            console.log(`Updated user with email ${email}`);
            alert(`${mergedUser.firstName} info is successfully updated`);
          }),
          map(() => mergedUser),
          catchError((error) => {
            console.error(error);
            return throwError('Could not update user.');
          })
        );
      }),
      catchError((error) => {
        console.error(error);
        return throwError('Could not get users.');
      })
    );
  }
}
