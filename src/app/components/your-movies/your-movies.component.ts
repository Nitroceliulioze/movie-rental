import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/Movie';
import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.component.html',
  styleUrls: ['./your-movies.component.css'],
})
export class YourMoviesComponent implements OnInit, OnDestroy {
  yourMovies: Movie[] = [];
  private sub!: Subscription;

  constructor(private yourMoviesService: YourMoviesService) {}

  ngOnInit(): void {
    this.sub = this.yourMoviesService
      .getMovies()
      .subscribe((yourMovies: Movie[]) => (this.yourMovies = yourMovies));
  }

  deleteMovie(yourMovie: Movie) {
    console.log(yourMovie.stock);
    yourMovie.stock = yourMovie.stock + 1;
    console.log(yourMovie.id);
    this.yourMoviesService
      .deleteMovie(yourMovie)
      .subscribe(
        () =>
          (this.yourMovies = this.yourMovies.filter(
            (m) => m.id !== yourMovie.id
          ))
      );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
