import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Movie } from '../Movie';

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
  // yourMovies: any = [];
  @Input() movie!: Movie;

  constructor(private http: HttpClient) {}

  // // //nededa i serveri dar kol kas
  // postYourMovie(): Observable<Movie> {
  //   return this.http.post<Movie>(this.yourMoviesUrl, this.movie, httpOptions);
  // }
  // addMovie() {this.postYourMovie()}

 
  // addMovie(movie: any) {
  //   if (movie.stock >= 1) {
  //     this.yourMovies.push(movie);
  //     movie.stock = movie.stock - 1;
  //   }
  //   console.log(this.yourMovies);
  //   return;
  // }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
}
