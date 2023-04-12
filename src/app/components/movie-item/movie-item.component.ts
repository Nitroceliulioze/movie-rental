// import { Component, OnInit, Input } from '@angular/core';
// import { Movie } from '../../Movie';
// import { MovieService } from 'src/app/services/movie.service';

// @Component({
//   selector: 'app-movie-item',
//   templateUrl: './movie-item.component.html',
//   styleUrls: ['./movie-item.component.css'],
// })
// export class MovieItemComponent {
//   @Input() movie!: Movie;
//   // yourMovies: Movie[] = [];

//   constructor(private moviesService: MovieService) {}

//   addMovie() {
//     if(this.movie.stock >= 1) {
//       this.moviesService.addMovie(this.movie);
//     alert(`${this.movie.title} has been adder to Your Movies`);
//     }
//     return
//   }
// }

import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../Movie';

import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-movie-item',

  templateUrl: './movie-item.component.html',

  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movie!: Movie; // yourMovies: Movie[] = [];

  constructor(private yourMoviesService: YourMoviesService) {}

  addMovie() {
    this.yourMoviesService.addMovie(this.movie).subscribe(() => {
      alert(`${this.movie.title} has been added to Your Movies`);
    });
  } // addMovie(movie: any) { //   this.yourMoviesService.addMovie(this.movie);  // this.yourMoviesService.addMovie(movie); //   alert(`${movie.title} has been adder to Your Movies`); // }
}
