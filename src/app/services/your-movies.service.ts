import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError  } from 'rxjs';
import { MovieInterface } from '../movie.interface';

@Injectable({
  providedIn: 'root',
})
export class YourMoviesService {
  private apiUrl = 'http://localhost:3000/your-movies';
  yourMovies: any = [];
  @Input() movie!: MovieInterface;
  yourMovie!: MovieInterface;

  constructor(private http: HttpClient) {}

  addMovie(movie: MovieInterface): Observable<MovieInterface> {
    if (movie.stock >= 1) {
      console.log(movie.stock)
      movie.stock = movie.stock - 1;
      return this.http.post<MovieInterface>(this.apiUrl, movie).pipe(
        tap((newMovie) => {
          this.yourMovies.push(newMovie);
        })
      );
      
    } else {
      const error = new Error('Stock is less than zero, cannot add movie');
      alert(`Sorry, we're out of stock`);
    return throwError(() => error);
    }
  }

  getMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.apiUrl);
  }

  deleteMovie(yourMovie: MovieInterface): Observable<{}> {
    console.log(yourMovie.id);
    yourMovie.stock = yourMovie.stock + 1;
    const url = `${this.apiUrl}/${yourMovie.id}`;
    alert(`${yourMovie.title} has been deleted from Your Movies`);
    return this.http.delete<MovieInterface>(url);
  }
}
