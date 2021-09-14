import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map, tap, switchMap } from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import {
  GENRES,
  genreValidator,
  sciFiGenreYearValidator,
} from '../../services/movies-validators.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'ngi-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movieForm: FormGroup = this.fb.group(
    {
      title: this.fb.control('', Validators.required),
      genre: this.fb.array([], {
        validators: genreValidator,
        updateOn: 'change',
      }),
      year: this.fb.control('', Validators.required),
      plot: this.fb.control('', Validators.required),
      poster: this.fb.control(''),
    },
    { validators: sciFiGenreYearValidator, updateOn: 'blur' }
  );
  public movieId: string | null;
  public genres = GENRES;
  private movie: Movie;

  get genreCtrls(): FormArray {
    return this.movieForm.get('genre') as FormArray;
  }

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
        const genre = movie.genre.split(',').map((g) => g.trim().toLowerCase());
        genre.forEach(() => this.addGenre());
        this.movieForm.patchValue({ ...movie, genre });
      });
  }

  onSubmit() {
    const { value } = this.movieForm;
    const modifiedMovie = {
      ...this.movie,
      ...value,
      genre: value.genre.filter((g: string) => g).join(', '),
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

  public addGenre(): void {
    this.genreCtrls.push(this.fb.control(''));
  }

  public removeGenre(index: number): void {
    this.genreCtrls.removeAt(index);
  }
}
