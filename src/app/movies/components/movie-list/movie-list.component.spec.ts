import { MovieItemComponent } from './../movie-item/movie-item.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let httpTestingController: HttpTestingController;
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the movies list', () => {
    // Arrange
    const mockMovies = [{}, {}, {}];
    let moviesList: HTMLElement[];

    // Act
    const reqGet = httpTestingController.expectOne(
      `${service.apiAddress}/movies?q=`
    );
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush(mockMovies);

    fixture.detectChanges();
    moviesList = fixture.nativeElement.querySelectorAll('ngi-movie-item');

    // Assert
    expect(moviesList.length).toBe(mockMovies.length);

    httpTestingController.verify();
  });
});
