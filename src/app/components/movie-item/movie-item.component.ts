import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../Movie';
import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  yourMovies: Movie[] = [];
  @Input() movie!: Movie;
  

  constructor(private yourMoviesService: YourMoviesService) {}

  addMovie(movie: any) {
    this.yourMoviesService.addMovie(movie);
    window.alert(`${movie.title} has been adder to Your Movies`);
  }

  
}