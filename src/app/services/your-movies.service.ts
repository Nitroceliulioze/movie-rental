import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root'
})
export class YourMoviesService {
  private apiUrl = 'http://localhost:3000/your-movies'
  yourMovies: any = [];
  @Input() yourMovie!: Movie;
  
  
  constructor(private http: HttpClient) { }



//kol kas hard coded your-movies serveryje
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
  
  //nezinau kaip cia issprest: neima yourMovies id, 
  deleteMovie(yourMovie: Movie): Observable<Movie> {
    console.log(yourMovie.id)
    //add stock
    const url = `${this.apiUrl}/${this.yourMovie.id}`
    return this.http.delete<Movie>(url)
  }
  
}
