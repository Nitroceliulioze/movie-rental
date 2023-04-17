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
  addYourMovie() {}

  addTime() {
    if (this.yourMovie.stock >= 1) {
      const newPrice = this.newPrice + this.yourMovie.price;
      this.newPrice = newPrice;
      // needs update in server
      this.yourMovie.stock = this.yourMovie.stock - 1;
      console.log(this.yourMovie.stock);
      if (this.time < 168) {
        this.time += 12;
      } else if (this.time === 168) {
        return;
      }
    } else if ((this.yourMovie.stock = 0)) {
      return;
    }
  }

  removeTime() {
    // needs update in server

    if (this.time > 12) {
      this.time -= 12;
      const newPrice = this.newPrice - this.yourMovie.price;
      this.newPrice = newPrice;
      console.log(newPrice);
      this.yourMovie.stock = this.yourMovie.stock + 1;
      console.log(this.yourMovie.stock);

    } else if (this.time === 12) {
      return;
    }
  }

  removeMovie(yourMovie: Movie) {
    this.deleteMovie.emit(yourMovie);
  }
}
