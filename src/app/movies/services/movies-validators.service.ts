import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
