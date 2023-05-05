import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MovieInterface } from '../movie.interface';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies';
  @Input() movie!: MovieInterface;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.apiUrl);
  }
}
