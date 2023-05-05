import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieInterface } from '../../movie.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: MovieInterface[] = [];
  private sub!: Subscription;

  constructor(private movieServise: MovieService) {}
  ngOnInit(): void {
    this.sub = this.movieServise.getMovies().subscribe((movies) => this.movies = movies);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
