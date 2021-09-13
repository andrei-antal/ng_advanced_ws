import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieService } from './movie.service';

export const GENRES = [
  'action',
  'adventure',
  'comedy',
  'crime',
  'drama',
  'fantasy',
  'historical',
  'horror',
  'mystery',
  'romance',
  'satire',
  'science fiction',
  'thriller',
  'western',
];

export const genreValidator: ValidatorFn = (
  ctrl: AbstractControl
): ValidationErrors | null => {
  const movieGenres: string[] =
    ctrl.value && ctrl.value.split(',').map((genre: string) => genre.trim());

  const isValidGenreList =
    movieGenres &&
    movieGenres.reduce((acc, curr) => {
      return acc && GENRES.includes(curr.toLowerCase());
    }, true);

  return isValidGenreList ? null : { wrongGenre: true };
};

@Injectable({ providedIn: 'root' })
export class MovieGenreAsyncValidator {
  constructor(private movieService: MovieService) {}

  public validateGenreAsync = (
    formControl: AbstractControl
  ): Observable<ValidationErrors | null> => {
    return this.movieService.getGenres().pipe(
      map((genresList) => {
        const movieGenres: string[] =
          formControl.value &&
          formControl.value.split(',').map((g: string) => g.trim());
        return movieGenres &&
          movieGenres.reduce((acc, curr) => {
            return acc && genresList.includes(curr.toLowerCase());
          }, true)
          ? null
          : { wrongGenre: true };
      })
    );
  };
}
