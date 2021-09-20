import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

import { BehaviorSubject, Observable, interval, merge, of } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import { EMPTY_MOVIE, Movie } from '../model/movie';

const REFRESH_INTERVAL = 10000;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiAddress = 'http://localhost:3000';
  private moviesApiUrl = `${this.apiAddress}/movies`;
  private genreApiUrl = `${this.apiAddress}/genres`;
  private cache$: Observable<Movie[]>;
  private reload$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getMovie(movieId?: string | null): Observable<Movie> {
    if (!movieId) {
      return of({
        ...EMPTY_MOVIE,
        id: uuid(),
      });
    }
    return this.http.get<Movie>(`${this.moviesApiUrl}/${movieId}`);
  }

  getMovies(searchTerm?: string): Observable<Movie[]> {
    if (!this.cache$ || searchTerm !== undefined) {
      this.cache$ = merge(this.reload$, interval(REFRESH_INTERVAL)).pipe(
        // tap(() => console.log('fetching movies')),
        switchMap(() =>
          this.http.get<Movie[]>(
            `${this.moviesApiUrl}?q=${searchTerm ? searchTerm.trim() : ''}`
          )
        ),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  reloadData() {
    this.reload$.next(null);
  }

  updateComment(movieId: string, newComment: string): Observable<Movie> {
    return this.http
      .patch<Movie>(`${this.moviesApiUrl}/${movieId}`, { comment: newComment })
      .pipe(tap(() => this.reloadData()));
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(`${this.moviesApiUrl}/${movieId}`)
      .pipe(tap(() => this.reloadData()));
  }

  createMovie(movie: Movie) {
    return this.http
      .post(`${this.moviesApiUrl}`, movie)
      .pipe(tap(() => this.reloadData()));
  }

  updateMovie(movie: Movie) {
    return this.http
      .put(`${this.moviesApiUrl}/${movie.id}`, movie)
      .pipe(tap(() => this.reloadData()));
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.genreApiUrl);
  }
}
