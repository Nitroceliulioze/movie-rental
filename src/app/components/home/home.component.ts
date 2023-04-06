import { Component, OnInit } from '@angular/core';
import { MOVIES } from '../../mock-movies';
import { Movie } from '../../Movie';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  movies: Movie[] = MOVIES

  ngOnInit(): void {
  }
}
