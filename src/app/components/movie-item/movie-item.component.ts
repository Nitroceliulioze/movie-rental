import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {  
  @Input() movie!: Movie;
  yourMovies: Movie[] = [];

  constructor(private moviesService: MovieService) {}

  addMovie(movie: any) {
    this.moviesService.addMovie(movie);
    alert(`${movie.title} has been adder to Your Movies`);
  }

  
}
