import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'ngm-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movie$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map((paramsMap) => paramsMap.get('id')),
      filter((id) => !!id),
      map((id) => id as string),
      switchMap((movieId) => this.movieService.getMovie(movieId))
    );
  }
}
