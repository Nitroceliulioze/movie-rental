import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../Movie';

import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-movie-item',

  templateUrl: './movie-item.component.html',

  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movie!: Movie; 

  constructor(private yourMoviesService: YourMoviesService) {}

  addMovie() {
    this.yourMoviesService.addMovie(this.movie).subscribe(() => {
      alert(`${this.movie.title} has been added to Your Movies`);
    });
  } 
}
