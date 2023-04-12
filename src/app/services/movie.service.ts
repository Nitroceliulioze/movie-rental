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
    this.yourMovies.push(movie);
    //change stock
    console.log(this.yourMovies);
  }
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
  }
}
