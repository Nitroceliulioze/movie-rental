import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/Movie';
import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-your-movie-item',
  templateUrl: './your-movie-item.component.html',
  styleUrls: ['./your-movie-item.component.css'],
})
export class YourMovieItemComponent implements OnInit {
  @Input() yourMovie!: Movie;
  @Output() deleteMovie: EventEmitter<Movie> = new EventEmitter();
  yourMovies!: Movie[];
  time: number = 12;
  newPrice!: number;

  constructor(private yourMoviesService: YourMoviesService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.yourMovie) {
      this.newPrice = this.yourMovie.price;
    }
  }

  addTime() {
    if (this.time < 168) {
      const newPrice = this.newPrice + this.yourMovie.price;
      this.newPrice = newPrice;
      this.time += 12;
    } else if (this.time === 168) {
      return;
    }
  }

  removeTime() {
    if (this.time > 12) {
      this.time -= 12;
      const newPrice = this.newPrice - this.yourMovie.price;
      this.newPrice = newPrice;
      console.log(newPrice);
    } else if (this.time === 12) {
      return;
    }
  }

  removeMovie(yourMovie: Movie) {
    this.deleteMovie.emit(yourMovie);
  }
}
