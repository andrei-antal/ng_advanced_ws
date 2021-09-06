import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

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
  @ViewChild('searchField') private searchField: ElementRef;

  constructor(public movieService: MovieService) {}

  public ngAfterViewInit(): void {
    this.movies$ = this.movieService.movies$;
    fromEvent(this.searchField.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map((ev: any) => ev.target.value),
        startWith('')
      )
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
