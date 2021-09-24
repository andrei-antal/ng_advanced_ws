import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { cold } from 'jest-marbles';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from '../../store/movies.reducer';
import { loadMovies } from '../../store/movies.actions';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let httpTestingController: HttpTestingController;
  let service: MovieService;
  let store: Store;
  const initialState = { movies: [], loading: false, error: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ moviesFeature: reducer }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the movies list', () => {
    const mockMovies = [{}, {}, {}];
    const select = cold('-a', { a: mockMovies });
    const spy = jest.spyOn(store, 'pipe').mockReturnValue(select);

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.movies$).toBeObservable(select);

    component.movies$.subscribe(() => {
      let moviesList: HTMLElement[];
      moviesList = fixture.nativeElement.querySelectorAll('ngi-movie-item');
      expect(moviesList.length).toBe(mockMovies.length);
    });
  });
});
