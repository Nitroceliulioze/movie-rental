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
  count: number = 1;
  originalPrice!: number;
  countDiff!: number;
  newPrice!: number;

  constructor(private yourMoviesService: YourMoviesService) {}

  ngOnInit(): void {}
  addYourMovie() {}

  addTime() {
    const originalPrice = this.yourMovie.price;
    this.count = this.count + 1;
    const countDiff = this.count - 1;
    const newPrice = originalPrice + originalPrice * countDiff;
    this.yourMovie.price = newPrice;
    this.yourMovie.price = originalPrice;
    console.log(newPrice);
    console.log(originalPrice);

    if (this.time < 168) {
      this.time += 12;
    } else if (this.time === 168) {
      return;
    }
  }

  removeTime() {
    const originalPrice = this.yourMovie.price;
    if (this.count >= 2) {
      this.count = this.count - 1;
      const countDiff = this.count - 1;
      const newPrice = originalPrice + originalPrice * countDiff;
      this.yourMovie.price = newPrice;
      this.yourMovie.price = originalPrice;
      console.log(newPrice);
      console.log(originalPrice);
    } 

    if (this.time > 12) {
      this.time -= 12;
    } else if (this.time === 12) {
      return;
    }
  }

  removeMovie(yourMovie: Movie) {
    this.deleteMovie.emit(yourMovie);
    console.log(yourMovie.id)
    // add stock
  }
}
