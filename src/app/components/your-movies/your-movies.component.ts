import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Movie';
import { YourMoviesService } from 'src/app/services/your-movies.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.component.html',
  styleUrls: ['./your-movies.component.css']
})
export class YourMoviesComponent implements OnInit  {
 yourMovies!: Movie[];
 time: number = 12;

  constructor(private yourMoviesService: YourMoviesService) {}

  ngOnInit(): void {
    this.yourMovies = this.yourMoviesService.getMovies();
  }

  removeMovie(yourMovie: Movie) {
    this.yourMovies = this.yourMoviesService.getMovies();
  }
 //addTime removeTime cia vyksta per visas eilutes, bet ne konkretu, tai reik irgi per konkretu id targetint
//kai sita daraiu movie item komponente veike, nes ten yra vienas movie
  addTime() {
    if (this.time < 168) {
      this.time += 12;
    } else if (this.time === 168) {
      return;
    }

    //kaskart dvigubina, o reik pridet konkretu skaiciu
    // CIA NEVEIKIA NES TURIU YOURMovies[] o ne viena yourMovie
    // this.yourMovies.price += this.yourMovies.price;
  }

  removeTime() {
    if (this.time > 0) {
      this.time -= 12;
    } else if (this.time === 12) {
      return;
    }
    // this.yourMovies.price -= this.yourMovies.price;
  }

}
