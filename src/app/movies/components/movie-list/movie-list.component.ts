import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { debounceTime, startWith, switchMap, tap } from 'rxjs/operators';

import { Movie } from '../../model/movie';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';
import { MovieState, getAllMovies } from '../../store/movies.reducer';
@Component({
  selector: 'ngi-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  public movies$: Observable<Movie[]>;
  public searchField = new FormControl('');

  constructor(private store: Store<MovieState>) {}

  public ngOnInit(): void {
    this.movies$ = this.store.pipe(
      select(getAllMovies),
      tap((state) => {
        console.log(state);
      })
    );
    // this.movies$ = this.searchField.valueChanges.pipe(
    //   debounceTime(300),
    //   startWith(undefined),
    //   switchMap((searchTerm) => this.movieService.getMovies(searchTerm))
    // );
  }

  public handleCommentUpdate(commentPayload: CommentUpdate): void {
    // this.movieService
    //   .updateComment(commentPayload.id, commentPayload.newComment)
    //   .subscribe();
  }

  public handleMovieDelete(movieId: string): void {
    // this.movieService.deleteMovie(movieId).subscribe();
  }

  public trackByFn(_: any, movie: Movie): string {
    return movie.id;
  }
}
