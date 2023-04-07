import { Injectable, Input } from '@angular/core';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root'
})
export class YourMoviesService {
  yourMovies: any = [];
  @Input() movie!: Movie;
  
  constructor() { }

  addMovie(movie: any) {
    this.yourMovies.push(movie);
    movie.stock - 1;
    console.log(this.yourMovies);
  }

  getMovies() {
    return this.yourMovies;
  }
  
  deleteMovie() {

  }
  
  clearYourMovies() {
    this.yourMovies = [];
    return this.yourMovies;
  }
}
