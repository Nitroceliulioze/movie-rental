import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError  } from 'rxjs';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root',
})
export class YourMoviesService {
  private apiUrl = 'http://localhost:3000/your-movies';
  yourMovies: any = [];
  @Input() movie!: Movie;
  yourMovie!: Movie;

  constructor(private http: HttpClient) {}

  addMovie(movie: Movie): Observable<Movie> {
    if (movie.stock >= 1) {
      console.log(movie.stock)
      movie.stock = movie.stock - 1;
      return this.http.post<Movie>(this.apiUrl, movie).pipe(
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

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  deleteMovie(yourMovie: Movie): Observable<Movie> {
    console.log(yourMovie.id);
    yourMovie.stock = yourMovie.stock + 1;
    const url = `${this.apiUrl}/${yourMovie.id}`;
    alert(`${yourMovie.title} has been deleted from Your Movies`);
    return this.http.delete<Movie>(url);
  }
}
