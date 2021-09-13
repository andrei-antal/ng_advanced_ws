import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

import { Movie } from '../../model/movie';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'ngi-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements AfterViewInit {
  public movies$: Observable<Movie[]>;
  public searchField = new FormControl('');

  constructor(public movieService: MovieService) {}

  public ngAfterViewInit(): void {
    this.movies$ = this.movieService.movies$;
    this.searchField.valueChanges
      .pipe(debounceTime(300), startWith(''))
      .subscribe((searchTerm) => this.movieService.getMovies(searchTerm));
  }

  public handleCommentUpdate(commentPayload: CommentUpdate): void {
    this.movieService
      .updateComment(commentPayload.id, commentPayload.newComment)
      .subscribe();
  }

  public handleMovieDelete(movieId: string): void {
    this.movieService.deleteMovie(movieId).subscribe();
  }

  public trackByFn(_: any, movie: Movie): string {
    return movie.id;
  }
}
