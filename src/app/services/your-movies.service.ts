import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root'
})
export class YourMoviesService {
  private apiUrl = 'http://localhost:3000/your-movies'
  yourMovies: any = [];
  @Input() movie!: Movie;
  yourMovie!: Movie;
  
  constructor(private http: HttpClient) { }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      tap((newMovie) => {
        this.yourMovies.push(newMovie);
        console.log(this.yourMovies);
      })
    );
  }

//kol kas hard coded your-movies serveryje
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
  
  //nezinau kaip cia issprest: neima yourMovies id, 
  deleteMovie(yourMovie: Movie): Observable<Movie> {
    console.log(yourMovie.id)
    //add stock
    const url = `${this.apiUrl}/${yourMovie.id}`
    return this.http.delete<Movie>(url)
  }  
}
