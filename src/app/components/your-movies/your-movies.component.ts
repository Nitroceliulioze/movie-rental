import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Movie';
import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.component.html',
  styleUrls: ['./your-movies.component.css'],
})
export class YourMoviesComponent implements OnInit {
  yourMovies: Movie[] = [];

  constructor(private yourMoviesService: YourMoviesService) {}

  ngOnInit(): void {
    this.yourMoviesService
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
}
