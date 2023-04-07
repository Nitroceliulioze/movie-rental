import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieServise: MovieService) {}
  ngOnInit(): void {
    this.movieServise.getMovies().subscribe((movies) => this.movies = movies);
  }
}
