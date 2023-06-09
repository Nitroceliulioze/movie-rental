import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MovieInterface } from '../../movie.interface';

import { YourMoviesService } from 'src/app/services/your-movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-item',

  templateUrl: './movie-item.component.html',

  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnDestroy{
  @Input() movie!: MovieInterface; 
  private sub!: Subscription;

  constructor(private yourMoviesService: YourMoviesService)  {}

  addMovie() {
    this.sub = this.yourMoviesService.addMovie(this.movie).subscribe(() => {
      alert(`${this.movie.title} has been added to Your Movies`);
    });
  } 

  ngOnDestroy(): void {
    // this.sub.unsubscribe(); 
    // if uncommented HERE APP CRASHES
  }
}
