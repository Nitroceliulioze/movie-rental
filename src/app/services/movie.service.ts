import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies'
  yourMovies: any = [];
  @Input() movie!: Movie;

  constructor(private http: HttpClient) { }

  addMovie(movie: any) {
    if (movie.stock >= 1) {
      this.yourMovies.push(movie);
      movie.stock = movie.stock - 1
    } 
    console.log(movie.stock);
    return
    
    //change stock
    
  }
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
  }
}
