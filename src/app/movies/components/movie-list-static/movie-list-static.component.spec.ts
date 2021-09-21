import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MovieListStaticComponent } from './movie-list-static.component';

describe('MovieListStaticComponent', () => {
  let component: MovieListStaticComponent;
  let fixture: ComponentFixture<MovieListStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListStaticComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
