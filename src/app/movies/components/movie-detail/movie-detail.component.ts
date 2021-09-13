import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map, tap, switchMap } from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import { genreValidator } from '../../services/movies-validators.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'ngi-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movieForm: FormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    genre: this.fb.control('', [Validators.required, genreValidator]),
    year: this.fb.control('', Validators.required),
    plot: this.fb.control('', Validators.required),
    poster: this.fb.control(''),
  });
  public movieId: string | null;
  private movie: Movie;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramsMap) => paramsMap.get('id')),
        tap((movieId) => (this.movieId = movieId)),
        switchMap((movieId) => this.movieService.getMovie(movieId))
      )
      .subscribe((movie) => {
        this.movie = movie;
        this.movieForm.patchValue(movie);
      });
  }

  onSubmit() {
    const { value } = this.movieForm;
    const modifiedMovie = {
      ...this.movie,
      ...value,
    };
    if (!this.movieId) {
      this.movieService.createMovie(modifiedMovie).subscribe(this.goBack);
    } else {
      this.movieService.updateMovie(modifiedMovie).subscribe(this.goBack);
    }
  }

  goBack = () => {
    this.router.navigate(['/movies']);
  };
}
