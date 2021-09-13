import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movie-detail.component';
import { MovieListStaticComponent } from './components/movie-list-static/movie-list-static.component';
import { RatingComponent } from './components/rating/rating.component';

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
  ],

  declarations: [
    MovieItemComponent,
    MovieListComponent,
    MovieListStaticComponent,
    MovieDetailComponent,
    RatingComponent,
  ],
})
export class MoviesModule {}
