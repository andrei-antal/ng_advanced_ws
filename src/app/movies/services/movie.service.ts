import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EMPTY_MOVIE, Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Subject<Movie[]> = new Subject();
  private apiAddress = 'http://localhost:3000';
  private moviesApiUrl = `${this.apiAddress}/movies`;
  private genreApiUrl = `${this.apiAddress}/genres`;
  public readonly movies$: Observable<Movie[]> = this.movies.asObservable();

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

  getMovies(searchTerm = ''): void {
    this.http
      .get<Movie[]>(`${this.moviesApiUrl}?q=${searchTerm.trim()}`)
      .subscribe((data) => this.movies.next(data));
  }

  updateComment(movieId: string, newComment: string): Observable<Movie> {
    return this.http
      .patch<Movie>(`${this.moviesApiUrl}/${movieId}`, { comment: newComment })
      .pipe(tap(() => this.getMovies()));
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(`${this.moviesApiUrl}/${movieId}`)
      .pipe(tap(() => this.getMovies()));
  }

  createMovie(movie: Movie) {
    return this.http.post(`${this.moviesApiUrl}`, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(`${this.moviesApiUrl}/${movie.id}`, movie);
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.genreApiUrl);
  }
}
