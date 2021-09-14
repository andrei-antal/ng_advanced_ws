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
  'sci-fi',
  'thriller',
  'western',
];

export const genreValidator: ValidatorFn = (
  ctrl: AbstractControl
): ValidationErrors | null => {
  if (!ctrl.value || !ctrl.value.join()) {
    return { wrongGenre: true };
  }

  const isValidGenreList = ctrl.value
    .filter((g: string) => g)
    .reduce((acc: boolean, curr: string) => {
      return acc && GENRES.includes(curr.toLowerCase());
    }, true);

  return isValidGenreList ? null : { wrongGenre: true };
};

export const sciFiGenreYearValidator: ValidatorFn = (
  ctrl: AbstractControl
): ValidationErrors | null => {
  const genreCtrl = ctrl.get('genre');
  const yearCtrl = ctrl.get('year');
  if (!genreCtrl || !yearCtrl) {
    return null;
  }
  const hasSciFi = (genreCtrl.value as string[])
    .map((g) => g.trim().toLowerCase())
    .includes('sci-fi');

  return hasSciFi && parseInt(yearCtrl.value, 10) < 1902
    ? { wrongSciFiYear: true }
    : null;
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
