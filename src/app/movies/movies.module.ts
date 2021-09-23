import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movie-detail.component';
import { MovieListStaticComponent } from './components/movie-list-static/movie-list-static.component';
import { RatingComponent } from './components/rating/rating.component';
import { GenreControlComponent } from './components/genre-control/genre-control.component';
import { WordCountPipe } from './pipes/word-count.pipe';
import { reducer } from './store/movies.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      // { path: '', component: MovieListStaticComponent },
      { path: 'new', component: MovieDetailComponent },
      { path: ':id', component: MovieDetailComponent },
    ]),
    StoreModule.forFeature('moviesFeature', reducer),
  ],

  declarations: [
    MovieItemComponent,
    MovieListComponent,
    MovieListStaticComponent,
    MovieDetailComponent,
    RatingComponent,
    GenreControlComponent,
    WordCountPipe,
  ],
})
export class MoviesModule {}
